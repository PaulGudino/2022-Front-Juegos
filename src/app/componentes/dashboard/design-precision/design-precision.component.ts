import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';
import { ThemeService } from 'src/app/servicios/theme/theme.service';
import { ImageService } from 'src/app/servicios/image/image.service';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
import { DashboardStyleService } from 'src/app/servicios/theme/dashboardStyle/dashboard-style.service';

@Component({
  selector: 'app-design-precision',
  templateUrl: './design-precision.component.html',
  styleUrls: ['./design-precision.component.css']
})
export class DesignPrecisionComponent implements OnInit {
  @ViewChild('uploadTime1', { static: false }) uploadTime1!: ElementRef;
  @ViewChild('uploadTime2', { static: false }) uploadTime2!: ElementRef;
  @ViewChild('uploadTime3', { static: false }) uploadTime3!: ElementRef;
  @ViewChild('uploadBackground', { static: false }) uploadBackground!: ElementRef;
  @ViewChild('uploadLogo', { static: false }) uploadLogo!: ElementRef;

  previewTime1: string = './assets/img/cajon_reloj.png';
  previewTime2: string = 'default-time2.png';
  previewTime3: string = 'default-time3.png';
  previewBackground: string = 'default.png';
  previewLogo: string = './assets/img/logo_Precision.png';

  fileToUploadTime1!: File | null;
  fileToUploadTime2!: File | null;
  fileToUploadTime3!: File | null;
  fileToUploadBackground!: File | null;
  fileToUploadLogo!: File | null;

  constructor(
    private snackbar: SnackbarService,
    private theme: ThemeService,
    private imageService: ImageService,
    private dialogService: ConfirmDialogService,
    private dashstyle: DashboardStyleService
  ) {}

  ngOnInit(): void {}

  handleFileInput(event: any, previewType: string): void {
    const file: File = event.target.files[0];
    if (file) {
      this.imageService.extraerBase64(file).then((image: any) => {
        switch (previewType) {
          case 'time1':
            this.previewTime1 = image.base;
            this.fileToUploadTime1 = file;
            break;
          case 'time2':
            this.previewTime2 = image.base;
            this.fileToUploadTime2 = file;
            break;
          case 'time3':
            this.previewTime3 = image.base;
            this.fileToUploadTime3 = file;
            break;
          case 'background':
            this.previewBackground = image.base;
            this.fileToUploadBackground = file;
            this.dashstyle.setImageBackgroundPrecisionFile(this.fileToUploadBackground)
            break;
          case 'logo':
            this.previewLogo = image.base;
            this.fileToUploadLogo = file;
            this.dashstyle.setImageLogoFile(this.fileToUploadLogo)
            break;
        }
      });
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
        let formData: FormData = new FormData();
        formData.append('id', '2');
        formData.append('date_modified', new Date().toISOString());
        formData.append('is_active', 'true');
        formData.append('game_id', '2');
        if (this.fileToUploadTime1) {
          formData.append('time1', this.fileToUploadTime1, this.fileToUploadTime1.name);
        }
        if (this.fileToUploadTime2) {
          formData.append('time2', this.fileToUploadTime2, this.fileToUploadTime2.name);
        }
        if (this.fileToUploadTime3) {
          formData.append('time3', this.fileToUploadTime3, this.fileToUploadTime3.name);
        }
        if (this.fileToUploadBackground) {
          formData.append('background', this.fileToUploadBackground, this.fileToUploadBackground.name);
        }
        if (this.fileToUploadLogo) {
          formData.append('logo', this.fileToUploadLogo, this.fileToUploadLogo.name);
        }
        this.theme.updateDesign(1, formData)
          this.snackbar.mensaje('Diseño actualizado exitosamente');
      }
    });
  }
}
