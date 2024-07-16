import { Component, OnInit } from '@angular/core';
import { PublicityService } from 'src/app/servicios/publicity/publicity.service';
import { DashboardPublicityService } from '../../../servicios/publicity/dashboardPublicity/dashboard-publicity.service';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ContentObserver } from '@angular/cdk/observers';
import { PuenteDatosService } from 'src/app/servicios/comunicacio_componentes/puente-datos.service';

@Component({
   selector: 'app-publicity',
   templateUrl: './publicity.component.html',
   styleUrls: ['./publicity.component.css'],
})
export class PublicityComponent implements OnInit {
   constructor(
      private publicity: PublicityService,
      public dashboardPublicityService: DashboardPublicityService,
      private router: Router,
      private snackbar: SnackbarService,
      private dialogService: ConfirmDialogService,
      private statickData: PuenteDatosService
   ) {}

   ngOnInit(): void {
      this.statickData.setMenu('Tragamonedas');
      this.publicity.getPublicityTopList().subscribe((dataTopPublicity) => {
         if (dataTopPublicity.length > 0) {
            this.dashboardPublicityService.loadTopData(dataTopPublicity);
            this.publicity
               .getPublicityBottomList()
               .subscribe((dataBottomPublicity) => {
                  this.dashboardPublicityService.loadBottomData(
                     dataBottomPublicity
                  );
               });
         }
      });
   }
   
}
