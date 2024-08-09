import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';
import { ThemeService } from 'src/app/servicios/theme/theme.service';
import { ImageService } from 'src/app/servicios/image/image.service';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
import { DashboardStyleService } from 'src/app/servicios/theme/dashboardStyle/dashboard-style.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Form } from '@angular/forms';

@Component({
  selector: 'app-design-doors',
  templateUrl: './design-doors.component.html',
  styleUrls: ['./design-doors.component.css']
})
export class DesignDoorsComponent implements OnInit {
  @ViewChild('takeInputDoorLeft', { static: false }) InputVarDoorLeft!: ElementRef;
  @ViewChild('takeInputDoorCenter', { static: false }) InputVarDoorCenter!: ElementRef;
  @ViewChild('takeInputDoorRight', { static: false }) InputVarDoorRight!: ElementRef;
  @ViewChild('takeInputBackground', { static: false }) InputVarBackground!: ElementRef;
  @ViewChild('takeInputLogo', { static: false }) InputVarLogo!: ElementRef;

  fileToUploadLogo!: File | null;
  imageLogo!: File;

  fileToUploadBackground!: File | null;
  imageBackground!: File | null;

  fileToUploadDoorLeft!: File | null;
  imageDoorLeft!: File;

  fileToUploadDoorCenter!: File | null;
  imageDoorCenter!: File;

  fileToUploadDoorRight!: File | null;
  imageDoorRight!: File;


  previewDoorLeft: string = '';
  previewDoorCenter: string = '';
  previewDoorRight: string = '';
  previewBackground?: string = '';
  previewLogo: string = '';

  

  constructor(
    private snackbar: SnackbarService,
    private theme: ThemeService,
    private imageService: ImageService,
    private dialogService: ConfirmDialogService,
    private dashStyle: DashboardStyleService,
    private router: Router,
    private imageSrv: ImageService,
  ) {}

  ngOnInit(): void {
    this.theme.getDesignInformation().subscribe((designData) => {
      this.dashStyle.loadData(designData[0]);
      this.previewDoorLeft = this.dashStyle.get_image_door_left();
      this.previewDoorCenter = this.dashStyle.get_image_door_center();
      this.previewDoorRight = this.dashStyle.get_image_door_right();
      this.previewBackground = this.dashStyle.get_image_background_puertas();
      this.previewLogo = this.dashStyle.get_image_logo_puertas();
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
          this.dashStyle.setImageBackgroundPuertasFile(this.fileToUploadBackground);
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
        this.dashStyle.setImageLogoPuertasFile(this.fileToUploadLogo);
      });
    } else {
      this.InputVarLogo.nativeElement.value = '';
      this.snackbar.mensaje('Solo se permiten imágenes');
    }
  }

  capturarFileDoors(event: any, puerta: string): void {
    switch (puerta) {
      case 'left':
        this.fileToUploadDoorLeft = this.imageSrv.captureFile(event);
        if (this.fileToUploadDoorLeft) {
          this.imageDoorLeft = this.fileToUploadDoorLeft;
          this.imageSrv.extraerBase64(this.fileToUploadDoorLeft).then((imageDoorLeft: any) => {
            this.previewDoorLeft = imageDoorLeft.base;
            this.dashStyle.setImageDoorLeftFile(this.fileToUploadDoorLeft);
          });
        } else {
          this.InputVarDoorLeft.nativeElement.value = '';
          this.snackbar.mensaje('Solo se permiten imágenes');
        }
        break;
      case 'center':
        this.fileToUploadDoorCenter = this.imageSrv.captureFile(event);
        if (this.fileToUploadDoorCenter) {
          this.imageDoorCenter = this.fileToUploadDoorCenter;
          this.imageSrv.extraerBase64(this.fileToUploadDoorCenter).then((imageDoorCenter: any) => {
            this.previewDoorCenter = imageDoorCenter.base;
            this.dashStyle.setImageDoorCenterFile(this.fileToUploadDoorCenter);
          });
        } else {
          this.InputVarDoorCenter.nativeElement.value = '';
          this.snackbar.mensaje('Solo se permiten imágenes');
        }
        break;
      case 'right':
        this.fileToUploadDoorRight = this.imageSrv.captureFile(event);
        if (this.fileToUploadDoorRight) {
          this.imageDoorRight = this.fileToUploadDoorRight;
          this.imageSrv.extraerBase64(this.fileToUploadDoorRight).then((imageDoorRight: any) => {
            this.previewDoorRight = imageDoorRight.base;
            this.dashStyle.setImageDoorRightFile(this.fileToUploadDoorRight);
          });
        } else {
          this.InputVarDoorRight.nativeElement.value = '';
          this.snackbar.mensaje('Solo se permiten imágenes');
        }
        break;
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
        if (this.fileToUploadDoorLeft) {
          this.theme.updateDesign(1, this.updateDoorLeftImage());
          this.snackbar.mensaje('Puerta Izquierda Actualizada exitosamente');
        }
        if (this.fileToUploadDoorCenter) {
          this.theme.updateDesign(1, this.updateDoorCenterImage());
          this.snackbar.mensaje('Puerta Central Actualizada exitosamente');
        }
        if (this.fileToUploadDoorRight) {
          this.theme.updateDesign(1, this.updateDoorRightImage());
          this.snackbar.mensaje('Puerta Derecha Actualizada exitosamente');
        }
        if (this.fileToUploadBackground) {
          this.theme.updateDesign(1, this.updateBackgroundImage());
          this.snackbar.mensaje('Fondo Actualizado exitosamente');
        }
        if (this.fileToUploadLogo) {
          this.theme.updateDesign(1, this.updateLogoImage());
          this.snackbar.mensaje('Logo Actualizado exitosamente');
        }
      }
    });
  }

  private updateLogoImage(): FormData {
    let formData: FormData = new FormData();
    formData.append('id', '1');
    formData.append(
      'image_logo_puertas',
      this.dashStyle.getImageLogoPuertasFile(),
      this.dashStyle.getImageLogoPuertasFile().name
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
      'image_background_puertas',
      this.dashStyle.getImageBackgroundPuertasFile(),
      this.dashStyle.getImageBackgroundPuertasFile().name
    );
    formData.append('date_modified', new Date().toISOString());
    formData.append('is_active', 'true');
    formData.append('game_id', '1');
    return formData;
  }

  updateDoorLeftImage(): FormData {
    let formData: FormData = new FormData();
    formData.append('id', '1');
    formData.append(
      'image_door_left',
      this.dashStyle.getImageDoorLeftFile(),
      this.dashStyle.getImageDoorLeftFile().name
    );
    formData.append('date_modified', new Date().toISOString());
    formData.append('is_active', 'true');
    formData.append('game_id', '1');
    return formData;
  }

  updateDoorCenterImage(): FormData {
    let formData: FormData = new FormData();
    formData.append('id', '1');
    formData.append(
      'image_door_center',
      this.dashStyle.getImageDoorCenterFile(),
      this.dashStyle.getImageDoorCenterFile().name
    );
    formData.append('date_modified', new Date().toISOString());
    formData.append('is_active', 'true');
    formData.append('game_id', '1');
    return formData;
  }

  updateDoorRightImage(): FormData {
    let formData: FormData = new FormData();
    formData.append('id', '1');
    formData.append(
      'image_door_right',
      this.dashStyle.getImageDoorRightFile(),
      this.dashStyle.getImageDoorRightFile().name
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
