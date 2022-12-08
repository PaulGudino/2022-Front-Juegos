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
      this.statickData.setMenuTragamonedas();
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
   // createPublicity() {}

   // updatePublicity() {
   //    const options = {
   //       title: 'ACTUALIZAR PUBLICIDAD',
   //       message: '¿ESTÁ SEGURO QUE DESEA ACTUALIZAR LA PUBLICIDAD?',
   //       cancelText: 'CANCELAR',
   //       confirmText: 'CREAR',
   //    };

   //    this.dialogService.open(options);
   //    this.dialogService.confirmed().subscribe((confirmed) => {
   //       if (confirmed) {
   //          if (
   //             this.dashboardPublicityService.getChangeTop() &&
   //             this.dashboardPublicityService.getChangeBottom()
   //          ) {
   //             this.updateTop();
   //             this.updateBottom();
   //             this.snackbar.mensaje('Publicidad Actualizada exitosamente');
   //             console.log('se agrega top y bottom');
   //          } else if (this.dashboardPublicityService.getChangeBottom()) {
   //             this.updateBottom();
   //             this.snackbar.mensaje('Publicidad Actualizada exitosamente');
   //          } else if (this.dashboardPublicityService.getChangeTop()) {
   //             this.updateTop();
   //             this.snackbar.mensaje('Publicidad Actualizada exitosamente');
   //          } else if (
   //             this.dashboardPublicityService.getTopPublicity().image == null &&
   //             this.dashboardPublicityService.getBottomPublicity().image == null
   //          ) {
   //             this.snackbar.mensaje(
   //                'No existe publicidad para agregar o actualizar'
   //             );
   //          }

   //          // this.publicity.put(1,formDataTop);
   //          // this.publicity.put(2,formDataBottom);
   //          // //this.router.navigate(['/dashboard/juego/fecha']);
   //       }
   //    });
   // }

   // private updateTop() {
   //    let formDataTop: FormData = new FormData();
   //    formDataTop.append('id', '1');
   //    formDataTop.append(
   //       'image',
   //       this.dashboardPublicityService.getTopImageFile(),
   //       this.dashboardPublicityService.getTopImageFile().name
   //    );
   //    formDataTop.append('titulo', 'Publicidad Superior');
   //    formDataTop.append(
   //       'created',
   //       this.dashboardPublicityService.getTopPublicity().created
   //    );
   //    formDataTop.append('modified', new Date().toISOString());
   //    formDataTop.append('is_active', 'true');
   //    this.publicity.put(1, formDataTop);
   //    this.dashboardPublicityService.setChangeTop(false);
   // }
   // private updateBottom() {
   //    let formDataBottom: FormData = new FormData();
   //    formDataBottom.append('id', '2');
   //    formDataBottom.append(
   //       'image',
   //       this.dashboardPublicityService.getBottomImageFile(),
   //       this.dashboardPublicityService.getBottomImageFile().name
   //    );
   //    formDataBottom.append('titulo', 'Publicidad Inferior');
   //    formDataBottom.append(
   //       'created',
   //       this.dashboardPublicityService.getBottomPublicity().created
   //    );
   //    formDataBottom.append('modified', new Date().toISOString());
   //    formDataBottom.append('is_active', 'true');
   //    this.publicity.put(2, formDataBottom);
   //    this.dashboardPublicityService.setChangeBottom(false);
   // }
   // signalChangeTop() {
   //    this.dashboardPublicityService.setChangeTop(true);
   // }
   // signalChangeBottom() {
   //    this.dashboardPublicityService.setChangeBottom(true);
   // }
}
