import { Component, OnInit, Input } from '@angular/core';
import { DashboardPublicityService } from 'src/app/servicios/publicity/dashboardPublicity/dashboard-publicity.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';
import { PublicityService } from 'src/app/servicios/publicity/publicity.service';

@Component({
   selector: 'app-bottom-publicity',
   templateUrl: './bottom-publicity.component.html',
   styleUrls: ['./bottom-publicity.component.css'],
})
export class BottomPublicityComponent implements OnInit {
   form: FormGroup;
   transitionTime: number = 0;

   constructor(
      public dashPublicity: DashboardPublicityService,
      private publicity: PublicityService,
      private router: Router,
      private fb: FormBuilder,
      private dialog: ConfirmDialogService,
      private snackBar: SnackbarService
   ) {
      this.form = this.fb.group({
         transition: [''],
      });
   }

   ngOnInit(): void {
      this.chargePublicity();
   }
   regresar() {
      this.router.navigate(['/dashboard/juego/publicidad']);
   }
   guardarPublicidad() {
      const options = {
         title: 'CAMBIAR CONFIGURACION PROBABILIDADES JUEGO',
         message:
            '¿ESTÁ SEGURO QUE QUIERE CAMBIAR LA CONFIGURACION DE PROBABILIDADES?',
         cancelText: 'CANCELAR',
         confirmText: 'CREAR',
      };
      if (
         !this.dashPublicity.getBottomImageFileToUpload() &&
         !this.form.valid
      ) {
         this.snackBar.mensaje('Agregue cambios antes de guardar');
      } else if (
         this.dashPublicity.getBottomImageFileToUpload() &&
         this.form.valid
      ) {
         this.dialog.open(options);
         this.dialog.confirmed().subscribe((confirmed) => {
            if (confirmed) {
               let formDataBottom: FormData = new FormData();
               let formData: FormData = new FormData();
               formDataBottom.append(
                  'image',
                  this.dashPublicity.getBottomImageFileToUpload(),
                  this.dashPublicity.getBottomImageFileToUpload().name
               );
               formData.append(
                  'time_display',
                  this.form.get('transition')?.value
               );
               this.publicity
                  .postBottomPublicity(formDataBottom)
                  .subscribe((data) => {
                     this.publicity
                        .updatePublicityConfigBottom(formData)
                        .subscribe((data) => {
                           this.chargePublicity();
                           this.cleanData();
                        });
                  });

               this.snackBar.mensaje(
                  'Publicidad Inferior Agregada exitosamente'
               );
            }
         });
      } else if (this.dashPublicity.getBottomImageFileToUpload()) {
         this.dialog.open(options);
         this.dialog.confirmed().subscribe((confirmed) => {
            if (confirmed) {
               let formDataBottom: FormData = new FormData();
               formDataBottom.append(
                  'image',
                  this.dashPublicity.getBottomImageFileToUpload(),
                  this.dashPublicity.getBottomImageFileToUpload().name
               );

               this.publicity
                  .postBottomPublicity(formDataBottom)
                  .subscribe((data) => {
                     this.chargePublicity();
                  });
               this.cleanData();
               this.snackBar.mensaje(
                  'Publicidad Inferior Agregada exitosamente'
               );
            }
         });
      } else if (this.form.valid) {
         this.dialog.open(options);
         this.dialog.confirmed().subscribe((confirmed) => {
            if (confirmed) {
               let formData: FormData = new FormData();
               formData.append(
                  'time_display',
                  this.form.get('transition')?.value
               );
               this.publicity
                  .updatePublicityConfigBottom(formData)
                  .subscribe((data) => {
                     this.cleanData();

                     this.chargePublicity();
                  });
               this.snackBar.mensaje(
                  'Publicidad Inferior Actualizada exitosamente'
               );
            }
         });
         // let user_register = localStorage.getItem('user_id');
      }
   }

   cleanData() {
      this.dashPublicity.setPreviewBottomImage('');
      this.form.controls['transition'].setValue('');
   }
   chargePublicity() {
      this.publicity.getPublicityBottomList().subscribe((data) => {
         this.dashPublicity.loadBottomData(data);
         this.publicity.getPublicityConfigTop().subscribe((config) => {
            this.transitionTime = config.time_display;
         });
      });
   }
}
