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
  @ViewChild('uploadDoorLeft', { static: false }) uploadDoorLeft!: ElementRef;
  @ViewChild('uploadDoorCenter', { static: false }) uploadDoorCenter!: ElementRef;
  @ViewChild('uploadDoorRight', { static: false }) uploadDoorRight!: ElementRef;
  @ViewChild('uploadBackground', { static: false }) uploadBackground!: ElementRef;
  @ViewChild('uploadLogo', { static: false }) uploadLogo!: ElementRef;

  previewDoorLeft: string = '';
  previewDoorCenter: string = '';
  previewDoorRight: string = '';
  previewBackground?: string = '';
  previewLogo: string = './assets/img/logoejemplo.png';

  fileToUploadDoorLeft!: File | null;
  fileToUploadDoorCenter!: File | null;
  fileToUploadDoorRight!: File | null;
  fileToUploadBackground!: File | null;
  fileToUploadLogo!: File | null;

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

  handleFileInput(event: any, previewType: string): void {
    this.fileToUploadDoorLeft = this.imageSrv.captureFile(event);
    if (this.fileToUploadDoorLeft) {
      this.imageService.extraerBase64(this.fileToUploadDoorLeft).then((image: any) => {
        switch (previewType) {
          case 'door-left':
            this.previewDoorLeft = image.base;
            this.dashStyle.set_image_door_left(this.fileToUploadDoorLeft);
            break;
          case 'door-center':
            this.previewDoorCenter = image.base;
            break;
          case 'door-right':
            this.previewDoorRight = image.base;
            break;
          case 'background':
            this.previewBackground = image.base;
            break;
          case 'logo':
            this.previewLogo = image.base;
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
        formData.append('id', '4');
        formData.append('date_modified', new Date().toISOString());
        formData.append('is_active', 'true');
        formData.append('game_id', '4');
        if (this.fileToUploadDoorLeft) {
          formData.append('door_left', this.fileToUploadDoorLeft, this.fileToUploadDoorLeft.name);
        }
        if (this.fileToUploadDoorCenter) {
          formData.append('door_center', this.fileToUploadDoorCenter, this.fileToUploadDoorCenter.name);
        }
        if (this.fileToUploadDoorRight) {
          formData.append('door_right', this.fileToUploadDoorRight, this.fileToUploadDoorRight.name);
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
