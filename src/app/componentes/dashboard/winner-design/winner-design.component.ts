import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DashboardPublicityService } from '../../../servicios/publicity/dashboardPublicity/dashboard-publicity.service';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';
import { PublicityService } from 'src/app/servicios/publicity/publicity.service';
import { ThemeService } from 'src/app/servicios/theme/theme.service';
import { ImageService } from 'src/app/servicios/image/image.service';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
import { DashboardStyleService } from 'src/app/servicios/theme/dashboardStyle/dashboard-style.service';
import { PuenteDatosService } from 'src/app/servicios/comunicacio_componentes/puente-datos.service';
@Component({
   selector: 'app-winner-design',
   templateUrl: './winner-design.component.html',
   styleUrls: ['./winner-design.component.css'],
})
export class WinnerDesignComponent implements OnInit {
   availableSpin: string = 'HAZ GANADO!!!';

   previsualizacion: string = '';
   @ViewChild('takeInput', { static: false })
   InputVar!: ElementRef;
   fileToUpload!: File | null;
   imagen!: File;

   constructor(
      public dashboardPublicityService: DashboardPublicityService,
      private publicity: PublicityService,
      // private router: Router,
      private snackbar: SnackbarService,
      private dialogService: ConfirmDialogService,
      private theme: ThemeService,
      public dashStyle: DashboardStyleService,
      private imageSrv: ImageService,
      private staticData: PuenteDatosService
   ) {}

   ngOnInit(): void {
      this.staticData.setMenuTragamonedas();
      this.publicity.getPublicityTopList().subscribe((data) => {
         this.dashboardPublicityService.loadTopData(data);
         this.publicity
            .getPublicityBottomList()
            .subscribe((bottomPublicityList) => {
               this.dashboardPublicityService.loadBottomData(
                  bottomPublicityList
               );
            });
         this.theme.getDesignInformation().subscribe((designData) => {
            this.dashStyle.loadData(designData[0]);
            this.previsualizacion = this.dashStyle.get_image_winner();
         });
      });
   }
   capturarFile(event: any): void {
      this.fileToUpload = this.imageSrv.captureFile(event);

      if (this.fileToUpload) {
         this.imagen = this.fileToUpload;
         this.imageSrv.extraerBase64(this.fileToUpload).then((imagen: any) => {
            this.previsualizacion = imagen.base;
            this.dashStyle.setImageWinnerGameFile(this.fileToUpload);
         });
      } else {
         this.InputVar.nativeElement.value = '';
         this.snackbar.mensaje('Solo se permiten imagenes');
      }
   }
   updateWinner() {
      const options = {
         title: 'ACTUALIZAR RESULTADO',
         message: '¿ESTÁ SEGURO QUE DESEA ACTUALIZAR LA IMAGEN DE RESULTADO GANADOR?',
         cancelText: 'CANCELAR',
         confirmText: 'ACTUALIZAR',
      };

      this.dialogService.open(options);
      this.dialogService.confirmed().subscribe((confirmed) => {
         if (confirmed && this.fileToUpload) {
            let formData: FormData = new FormData();
            formData.append('id', '1');

            formData.append(
               'image_winner',
               this.dashStyle.getImageWinnerGameFile(),
               this.dashStyle.getImageWinnerGameFile().name
            );
            formData.append('date_modified', new Date().toISOString());
            formData.append('game_id', '1');

            this.theme.updateDesgin(1, formData);
            //this.router.navigate(['/dashboard/juego/fecha']);
            this.snackbar.mensaje(
               'Informacion Diseño Ganadores Actualizada Exitosamente'
            );
         }
      });
   }
   cancel() {
      // this.previsualizacion = this.dashStyle.get_image_winner();
      window.location.reload();
   }
}
