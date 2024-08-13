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
  @ViewChild('takeInputBackground', { static: false }) InputVarBackground!: ElementRef;
  @ViewChild('takeInputLogo', { static: false }) InputVarLogo!: ElementRef;
  @ViewChild('takeInputBoxWatch', { static: false }) InputVarBoxWatch!: ElementRef;

  previewWatchBox: string = '';
  previewBackground?: string = '';
  previewLogo: string = '';

  
  fileToUploadLogo!: File | null;
  imageLogo!: File;

  fileToUploadBackground!: File | null;
  imageBackground!: File | null;

  fileToUploadBoxWatch!: File | null;
  imageBoxWatch!: File;

  constructor(
    private snackbar: SnackbarService,
    private theme: ThemeService,
    private imageSrv: ImageService,
    private dialogService: ConfirmDialogService,
    private dashStyle: DashboardStyleService
  ) {}

  ngOnInit(): void {
    this.theme.getDesignInformation().subscribe((designData) => {
      this.dashStyle.loadData(designData[0]);
      this.previewWatchBox = this.dashStyle.get_image_box_watch();
      this.previewBackground = this.dashStyle.get_image_background_precision();
      this.previewLogo = this.dashStyle.get_image_logo_precision();
    });
  }

  capturarBackgroundFile(event: any): void {
    this.fileToUploadBackground = this.imageSrv.captureFile(event);
    if (this.fileToUploadBackground) {
      this.imageBackground = this.fileToUploadBackground;
      this.imageSrv
        .extraerBase64(this.fileToUploadBackground)
        .then((imagenBackground: any) => {
          this.previewBackground = imagenBackground.base;
          this.dashStyle.setImageBackgroundPrecisionFile(this.fileToUploadBackground);
        });
    } else {
      this.InputVarBackground.nativeElement.value = '';
      this.snackbar.mensaje('Solo se permiten imagenes');
    }
  }

  capturarFileLogo(event: any): void {
    this.fileToUploadLogo = this.imageSrv.captureFile(event);
    if (this.fileToUploadLogo) {
      this.imageLogo = this.fileToUploadLogo;
      this.imageSrv.extraerBase64(this.fileToUploadLogo).then((imagenLogo: any) => {
        this.previewLogo = imagenLogo.base;
        this.dashStyle.setImageLogoPrecisionFile(this.fileToUploadLogo);
      });
    } else {
      this.InputVarLogo.nativeElement.value = '';
      this.snackbar.mensaje('Solo se permiten imágenes');
    }
  }

  capturarFileBoxWatch(event: any): void {
    this.fileToUploadBoxWatch = this.imageSrv.captureFile(event);
    if (this.fileToUploadBoxWatch) {
      this.imageBoxWatch = this.fileToUploadBoxWatch;
      this.imageSrv.extraerBase64(this.fileToUploadBoxWatch).then((imagenBoxWatch: any) => {
        this.previewWatchBox = imagenBoxWatch.base;
        this.dashStyle.setImageBoxWatchFile(this.fileToUploadBoxWatch);
      });
    } else {
      this.InputVarBoxWatch.nativeElement.value = '';
      this.snackbar.mensaje('Solo se permiten imágenes');
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
        if (this.fileToUploadBackground) {
          this.theme.updateDesign(1, this.updateBackgroundImage());
          this.snackbar.mensaje('Fondo Actualizado exitosamente');
        } else if (this.fileToUploadLogo) {
          this.theme.updateDesign(1, this.updateLogoImage());
          this.snackbar.mensaje('Logo Actualizado exitosamente');
        } else if (this.fileToUploadBoxWatch) {
          this.theme.updateDesign(1, this.updateBoxWatchImage());
          this.snackbar.mensaje('Caja de Reloj Actualizada exitosamente');
        }
      }
    });
  }

  private updateLogoImage(): FormData {
    let formData: FormData = new FormData();
    formData.append('id', '1');
    formData.append(
      'image_logo_precision',
      this.dashStyle.getImageLogoPrecisionFile(),
      this.dashStyle.getImageLogoPrecisionFile().name
    );
    formData.append('date_modified', new Date().toISOString());
    formData.append('is_active', 'true');
    formData.append('game_id', '1');
    return formData;

  }

  updateBackgroundImage(): FormData {
    let formData: FormData = new FormData();
    formData.append('id', '1');
    formData.append(
      'image_background_precision',
      this.dashStyle.getImageBackgroundPrecisionFile(),
      this.dashStyle.getImageBackgroundPrecisionFile().name
    );
    formData.append('date_modified', new Date().toISOString());
    formData.append('is_active', 'true');
    formData.append('game_id', '1');
    return formData;
  }

  updateBoxWatchImage(): FormData {
    let formData: FormData = new FormData();
    formData.append('id', '1');
    formData.append(
      'image_box_watch',
      this.dashStyle.getImageBoxWatchFile(),
      this.dashStyle.getImageBoxWatchFile().name
    );
    formData.append('date_modified', new Date().toISOString());
    formData.append('is_active', 'true');
    formData.append('game_id', '1');
    return formData;
  }

  cancel() {
    window.location.reload();
  }
}
