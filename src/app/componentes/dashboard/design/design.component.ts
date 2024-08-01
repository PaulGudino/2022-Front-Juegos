import { PuenteDatosService } from 'src/app/servicios/comunicacio_componentes/puente-datos.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DashboardPublicityService } from '../../../servicios/publicity/dashboardPublicity/dashboard-publicity.service';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';
import { PublicityService } from 'src/app/servicios/publicity/publicity.service';
import { ThemeService } from 'src/app/servicios/theme/theme.service';
import { ImageService } from 'src/app/servicios/image/image.service';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
import { DashboardStyleService } from 'src/app/servicios/theme/dashboardStyle/dashboard-style.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Form } from '@angular/forms';
import { PublicityGameService } from 'src/app/servicios/publicityGame/publicity-game.service';
@Component({
   selector: 'app-design',
   templateUrl: './design.component.html',
   styleUrls: ['./design.component.css'],
})
export class DesignComponent implements OnInit {
   availableSpin: string = 'Disponible 1 Giro más!';
   fontFamily: string = '';
   colorText: string = '';

   previsulizacionMachine: string = '';
   previsulizacionLogo: string = '';
   @ViewChild('takeInput', { static: false })
   InputVar!: ElementRef;

   @ViewChild('takeInputLogo', { static: false })
   InputVarLogo!: ElementRef;

   fileToUploadMachine!: File | null;
   imagenMachine!: File;

   fileToUploadLogo!: File | null;
   imagenLogo!: File;

   urlLogo1: string = '';
   urlLogo2: string = '';
   urlLogo3: string = '';

   constructor(
      public dashboardPublicityService: DashboardPublicityService,
      private publicity: PublicityService,
      private router: Router,
      private snackbar: SnackbarService,
      private dialogService: ConfirmDialogService,
      private theme: ThemeService,
      public dashStyle: DashboardStyleService,
      private imageSrv: ImageService,
      private publicityGame: PublicityGameService,
      private staticData: PuenteDatosService
   ) {}

   ngOnInit(): void {
      this.staticData.setMenu('Tragamonedas');
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
            this.previsulizacionMachine =
               this.dashStyle.get_image_machine_game();
            this.previsulizacionLogo = this.dashStyle.get_image_logo_game();
            this.fontFamily = this.dashStyle.get_font_letter();
            this.colorText = this.dashStyle.get_color_text();

            this.publicityGame.getPublicityGame('1').subscribe((data) => {
               this.urlLogo1 = data.image;
            });
            this.publicityGame.getPublicityGame('2').subscribe((data) => {
               this.urlLogo2 = data.image;
            });
            this.publicityGame.getPublicityGame('3').subscribe((data) => {
               this.urlLogo3 = data.image;
            });
         });
      });
   }
   goEditGamePublicity() {}

   capturarFile(event: any): void {
      this.fileToUploadMachine = this.imageSrv.captureFile(event);

      if (this.fileToUploadMachine) {
         this.imagenMachine = this.fileToUploadMachine;
         this.imageSrv
            .extraerBase64(this.fileToUploadMachine)
            .then((imagenMachine: any) => {
               this.previsulizacionMachine = imagenMachine.base;
               this.dashStyle.setImageMchineGameFile(this.fileToUploadMachine);
            });
      } else {
         this.InputVar.nativeElement.value = '';
         this.InputVarLogo.nativeElement.value = '';
         this.snackbar.mensaje('Solo se permiten imagenes');
      }
   }

   capturarFileLogo(event: any): void {
      this.fileToUploadLogo = this.imageSrv.captureFile(event);
      if (this.fileToUploadLogo) {
         this.imagenLogo = this.fileToUploadLogo;
         this.imageSrv
            .extraerBase64(this.fileToUploadLogo)
            .then((imagenLogo: any) => {
               this.previsulizacionLogo = imagenLogo.base;
               this.dashStyle.setImageLogoFile(this.fileToUploadLogo);
            });
      } else {
         this.InputVarLogo.nativeElement.value = '';
         this.snackbar.mensaje('Solo se permiten imagenes');
      }
   }

   updateDesign() {
      const options = {
         title: 'ACTUALIZAR DISEÑO DEL JUEGO',
         message: '¿ESTÁ SEGURO QUE DESEA ACTUALIZAR EL DISEÑO DEL JUEGO?',
         cancelText: 'CANCELAR',
         confirmText: 'ACTUALIZAR',
      };
      this.dialogService.open(options);
      this.dialogService.confirmed().subscribe((confirmed) => {
         if (confirmed) {
            if (this.fileToUploadMachine && this.fileToUploadLogo) {
               let formMachine: FormData = this.updateMachineImage();
               formMachine.append(
                  'image_logo_game',
                  this.dashStyle.getImageLogoFile(),
                  this.dashStyle.getImageLogoFile().name
               );
               this.theme.updateDesgin(1, formMachine);
               this.snackbar.mensaje('Salvapantallas Actualizado exitosamente');
            } else if (this.fileToUploadMachine) {
               let form = this.updateMachineImage();
               this.theme.updateDesgin(1, form);
               this.snackbar.mensaje('Salvapantallas Actualizado exitosamente');
            } else if (this.fileToUploadLogo) {
               this.updateLogoImage();
            } else if (!this.fileToUploadMachine && !this.fileToUploadLogo) {
               let formData: FormData = new FormData();
               formData.append('id', '1');
               formData.append('color_text', this.colorText);
               formData.append('font_letter', this.fontFamily);
               formData.append('date_modified', new Date().toISOString());
               formData.append('is_active', 'true');
               formData.append('game_id', '1');
               this.theme.updateDesgin(1, formData);

               this.snackbar.mensaje('Salvapantallas Actualizado exitosamente');
            }
         }
      });
   }

   updateMachineImage(): FormData {
      let formData: FormData = new FormData();
      formData.append('id', '1');
      formData.append(
         'image_machine_game',
         this.dashStyle.getImageMachineGameFile(),
         this.dashStyle.getImageMachineGameFile().name
      );
      formData.append('color_text', this.colorText);
      formData.append('font_letter', this.fontFamily);
      formData.append('date_modified', new Date().toISOString());
      formData.append('is_active', 'true');
      formData.append('game_id', '1');
      return formData;


   }
   private updateLogoImage() {
      let formData: FormData = new FormData();
      formData.append('id', '1');
      formData.append(
         'image_logo_game',
         this.dashStyle.getImageLogoFile(),
         this.dashStyle.getImageLogoFile().name
      );
      formData.append('color_text', this.colorText);
      formData.append('font_letter', this.fontFamily);
      formData.append('date_modified', new Date().toISOString());
      formData.append('is_active', 'true');
      formData.append('game_id', '1');

      this.theme.updateDesgin(1, formData);
      this.snackbar.mensaje('Salvapantallas Actualizado exitosamente');
   }

   previewChangeFontLetter(event: Event) {
      let element: HTMLSelectElement = event.target as HTMLSelectElement;
      this.fontFamily = element.value;
   }
   previewChangeColorLetter(event: Event) {
      let element: HTMLSelectElement = event.target as HTMLSelectElement;
      this.colorText = element.value;
   }
   cancel() {
      window.location.reload();
   }
}
