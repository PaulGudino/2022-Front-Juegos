import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DashboardPublicityService } from 'src/app/servicios/publicity/dashboardPublicity/dashboard-publicity.service';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';
import { PublicityService } from 'src/app/servicios/publicity/publicity.service';
import { ThemeService } from 'src/app/servicios/theme/theme.service';
import { ImageService } from 'src/app/servicios/image/image.service';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
import { DashboardStyleService } from 'src/app/servicios/theme/dashboardStyle/dashboard-style.service';
import { Router } from '@angular/router';
import { PublicityGameService } from 'src/app/servicios/publicityGame/publicity-game.service';
import { PuenteDatosService } from 'src/app/servicios/comunicacio_componentes/puente-datos.service';

@Component({
  selector: 'app-design-rolldice',
  templateUrl: './design-rolldice.component.html',
  styleUrls: ['./design-rolldice.component.css'],
})
export class DesignRolldiceComponent implements OnInit {

  @ViewChild('takeInputLogo', { static: false }) InputVarLogo!: ElementRef;
  @ViewChild('takeInputBackground', { static: false }) InputVarBackground!: ElementRef;
  @ViewChild('takeInputDiceFaceOne', { static: false }) InputVarDiceFaceOne!: ElementRef;
  @ViewChild('takeInputDiceFaceTwo', { static: false }) InputVarDiceFaceTwo!: ElementRef;
  @ViewChild('takeInputDiceFaceThree', { static: false }) InputVarDiceFaceThree!: ElementRef;
  @ViewChild('takeInputDiceFaceFour', { static: false }) InputVarDiceFaceFour!: ElementRef;
  @ViewChild('takeInputDiceFaceFive', { static: false }) InputVarDiceFaceFive!: ElementRef;
  @ViewChild('takeInputDiceFaceSix', { static: false }) InputVarDiceFaceSix!: ElementRef;


  fileToUploadLogo!: File | null;
  imageLogo!: File;

  fileToUploadBackground!: File | null;
  imageBackground!: File | null;

  fileToUploadDiceFaceOne!: File | null;
  imageDiceFaceOneFile!: File | null;

  fileToUploadDiceFaceTwo!: File | null;
  imageDiceFaceTwoFile!: File | null;

  fileToUploadDiceFaceThree!: File | null;
  imageDiceFaceThreeFile!: File | null;

  fileToUploadDiceFaceFour!: File | null;
  imageDiceFaceFourFile!: File | null;

  fileToUploadDiceFaceFive!: File | null;
  imageDiceFaceFiveFile!: File | null;

  fileToUploadDiceFaceSix!: File | null
  imageDiceFaceSixFile!: File | null;

  previsulizacionLogo?: string = '';
  previsulizacionBackground?: string = '';
  previsulizacionDiceFaceOne?: string = '';
  previsulizacionDiceFaceTwo?: string = '';
  previsulizacionDiceFaceThree?: string = '';
  previsulizacionDiceFaceFour?: string = '';
  previsulizacionDiceFaceFive?: string = '';
  previsulizacionDiceFaceSix?: string = '';


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
  ) { }

  ngOnInit(): void {
    this.staticData.setMenu('Dados');
    this.publicity.getPublicityTopList().subscribe((data) => {
      this.dashboardPublicityService.loadTopData(data);
      this.publicity.getPublicityBottomList().subscribe((bottomPublicityList) => {
        this.dashboardPublicityService.loadBottomData(bottomPublicityList);
      });
      this.theme.getDesignInformation().subscribe((designData) => {
        this.dashStyle.loadData(designData[0]);
        this.previsulizacionLogo = this.dashStyle.get_image_logo_dados();
        this.previsulizacionBackground = this.dashStyle.get_image_background_dados();
        this.previsulizacionDiceFaceOne = this.dashStyle.get_image_dice_face_one();
        this.previsulizacionDiceFaceTwo = this.dashStyle.get_image_dice_face_two();
        this.previsulizacionDiceFaceThree = this.dashStyle.get_image_dice_face_three();
        this.previsulizacionDiceFaceFour = this.dashStyle.get_image_dice_face_four();
        this.previsulizacionDiceFaceFive = this.dashStyle.get_image_dice_face_five();
        this.previsulizacionDiceFaceSix = this.dashStyle.get_image_dice_face_six();
      });
    });
  }

  capturarBackgroundFile(event: any): void {
    this.fileToUploadBackground = this.imageSrv.captureFile(event);

    if (this.fileToUploadBackground) {
      this.imageBackground = this.fileToUploadBackground;
      this.imageSrv
        .extraerBase64(this.fileToUploadBackground)
        .then((imagenBackground: any) => {
          this.previsulizacionBackground = imagenBackground.base;
          this.dashStyle.setImageBackgroundDadosFile(this.fileToUploadBackground);
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
        this.previsulizacionLogo = imagenLogo.base;
        this.dashStyle.setImageLogoDadosFile(this.fileToUploadLogo);
      });
    } else {
      this.InputVarLogo.nativeElement.value = '';
      this.snackbar.mensaje('Solo se permiten imágenes');
    }
  }

  capturarFileDiceFaces(event: any, dado: String): void {
    switch (dado) {
      case 'one':
        this.fileToUploadDiceFaceOne = this.imageSrv.captureFile(event);
        if (this.fileToUploadDiceFaceOne) {
          this.imageDiceFaceOneFile = this.fileToUploadDiceFaceOne;
          this.imageSrv.extraerBase64(this.fileToUploadDiceFaceOne).then((imagenDiceFaceOne: any) => {
            this.previsulizacionDiceFaceOne = imagenDiceFaceOne.base;
            this.dashStyle.setImageDiceFaceOneFile(this.fileToUploadDiceFaceOne);
          });
        } else {
          this.InputVarDiceFaceOne.nativeElement.value = '';
          this.snackbar.mensaje('Solo se permiten imágenes');
        }
        break;
      case 'two':
        this.fileToUploadDiceFaceTwo = this.imageSrv.captureFile(event);
        if (this.fileToUploadDiceFaceTwo) {
          this.imageDiceFaceTwoFile = this.fileToUploadDiceFaceTwo;
          this.imageSrv.extraerBase64(this.fileToUploadDiceFaceTwo).then((imagenDiceFaceTwo: any) => {
            this.previsulizacionDiceFaceTwo = imagenDiceFaceTwo.base;
            this.dashStyle.setImageDiceFaceTwoFile(this.fileToUploadDiceFaceTwo);
          });
        } else {
          this.InputVarDiceFaceTwo.nativeElement.value = '';
          this.snackbar.mensaje('Solo se permiten imágenes');
        }
        break;
      case 'three':
        this.fileToUploadDiceFaceThree = this.imageSrv.captureFile(event);
        if (this.fileToUploadDiceFaceThree) {
          this.imageDiceFaceThreeFile = this.fileToUploadDiceFaceThree;
          this.imageSrv.extraerBase64(this.fileToUploadDiceFaceThree).then((imagenDiceFaceThree: any) => {
            this.previsulizacionDiceFaceThree = imagenDiceFaceThree.base;
            this.dashStyle.setImageDiceFaceThreeFile(this.fileToUploadDiceFaceThree);
          });
        } else {
          this.InputVarDiceFaceThree.nativeElement.value = '';
          this.snackbar.mensaje('Solo se permiten imágenes');
        }
        break;
      case 'four':
        this.fileToUploadDiceFaceFour = this.imageSrv.captureFile(event);
        if (this.fileToUploadDiceFaceFour) {
          this.imageDiceFaceFourFile = this.fileToUploadDiceFaceFour;
          this.imageSrv.extraerBase64(this.fileToUploadDiceFaceFour).then((imagenDiceFaceFour: any) => {
            this.previsulizacionDiceFaceFour = imagenDiceFaceFour.base;
            this.dashStyle.setImageDiceFaceFourFile(this.fileToUploadDiceFaceFour);
          });
        } else {
          this.InputVarDiceFaceFour.nativeElement.value = '';
          this.snackbar.mensaje('Solo se permiten imágenes');
        }
        break;
      case 'five':
        this.fileToUploadDiceFaceFive = this.imageSrv.captureFile(event);
        if (this.fileToUploadDiceFaceFive) {
          this.imageDiceFaceFiveFile = this.fileToUploadDiceFaceFive;
          this.imageSrv.extraerBase64(this.fileToUploadDiceFaceFive).then((imagenDiceFaceFive: any) => {
            this.previsulizacionDiceFaceFive = imagenDiceFaceFive.base;
            this.dashStyle.setImageDiceFaceFiveFile(this.fileToUploadDiceFaceFive);
          });
        } else {
          this.InputVarDiceFaceFive.nativeElement.value = '';
          this.snackbar.mensaje('Solo se permiten imágenes');
        }
        break;
      case 'six':
        this.fileToUploadDiceFaceSix = this.imageSrv.captureFile(event);
        if (this.fileToUploadDiceFaceSix) {
          this.imageDiceFaceSixFile = this.fileToUploadDiceFaceSix;
          this.imageSrv.extraerBase64(this.fileToUploadDiceFaceSix).then((imagenDiceFaceSix: any) => {
            this.previsulizacionDiceFaceSix = imagenDiceFaceSix.base;
            this.dashStyle.setImageDiceFaceSixFile(this.fileToUploadDiceFaceSix);
          });
        } else {
          this.InputVarDiceFaceSix.nativeElement.value = '';
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
        if (this.fileToUploadBackground) {
          this.theme.updateDesign(1, this.updateBackgroundImage());
          this.snackbar.mensaje('Fondo Actualizado exitosamente');
        } else if (this.fileToUploadLogo) {
          this.theme.updateDesign(1, this.updateLogoImage());
          this.snackbar.mensaje('Logo Actualizado exitosamente');
        } else if (this.fileToUploadDiceFaceOne) {
          this.theme.updateDesign(1, this.updateDiceFaceOne());
          this.snackbar.mensaje('Cara 1 del dado actualizada exitosamente');
        } else if (this.fileToUploadDiceFaceTwo) {
          this.theme.updateDesign(1, this.updateDiceFaceTwo());
          this.snackbar.mensaje('Cara 2 del dado actualizada exitosamente');
        } else if (this.fileToUploadDiceFaceThree) {
          this.theme.updateDesign(1, this.updateDiceFaceThree());
          this.snackbar.mensaje('Cara 3 del dado actualizada exitosamente');
        } else if (this.fileToUploadDiceFaceFour) {
          this.theme.updateDesign(1, this.updateDiceFaceFour());
          this.snackbar.mensaje('Cara 4 del dado actualizada exitosamente');
        } else if (this.fileToUploadDiceFaceFive) {
          this.theme.updateDesign(1, this.updateDiceFaceFive());
          this.snackbar.mensaje('Cara 5 del dado actualizada exitosamente');
        } else if (this.fileToUploadDiceFaceSix) {
          this.theme.updateDesign(1, this.updateDiceFaceSix());
          this.snackbar.mensaje('Cara 6 del dado actualizada exitosamente');
        }
      }
    });
  }



  private updateLogoImage(): FormData {
    let formData: FormData = new FormData();
    formData.append('id', '1');
    formData.append(
      'image_logo_dados',
      this.dashStyle.getImageLogoDadosFile(),
      this.dashStyle.getImageLogoDadosFile().name
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
      'image_background_dados',
      this.dashStyle.getImageBackgroundDadosFile(),
      this.dashStyle.getImageBackgroundDadosFile().name
    );
    formData.append('date_modified', new Date().toISOString());
    formData.append('is_active', 'true');
    formData.append('game_id', '1');
    return formData;
  }


  updateDiceFaceOne(): FormData {
    let formData: FormData = new FormData();
    formData.append('id', '1');
    formData.append(
      'image_dice_face_one',
      this.dashStyle.getImageDiceFaceOneFile(),
      this.dashStyle.getImageDiceFaceOneFile().name
    );
    formData.append('date_modified', new Date().toISOString());
    formData.append('is_active', 'true');
    formData.append('game_id', '1');
    return formData;
  }

  updateDiceFaceTwo(): FormData {
    let formData: FormData = new FormData();
    formData.append('id', '1');
    formData.append(
      'image_dice_face_two',
      this.dashStyle.getImageDiceFaceTwoFile(),
      this.dashStyle.getImageDiceFaceTwoFile().name
    );
    formData.append('date_modified', new Date().toISOString());
    formData.append('is_active', 'true');
    formData.append('game_id', '1');
    return formData;
  }

  updateDiceFaceThree(): FormData {
    let formData: FormData = new FormData();
    formData.append('id', '1');
    formData.append(
      'image_dice_face_three',
      this.dashStyle.getImageDiceFaceThreeFile(),
      this.dashStyle.getImageDiceFaceThreeFile().name
    );
    formData.append('date_modified', new Date().toISOString());
    formData.append('is_active', 'true');
    formData.append('game_id', '1');
    return formData;
  }

  updateDiceFaceFour(): FormData {
    let formData: FormData = new FormData();
    formData.append('id', '1');
    formData.append(
      'image_dice_face_four',
      this.dashStyle.getImageDiceFaceFourFile(),
      this.dashStyle.getImageDiceFaceFourFile().name
    );
    formData.append('date_modified', new Date().toISOString());
    formData.append('is_active', 'true');
    formData.append('game_id', '1');
    return formData;
  }

  updateDiceFaceFive(): FormData {
    let formData: FormData = new FormData();
    formData.append('id', '1');
    formData.append(
      'image_dice_face_five',
      this.dashStyle.getImageDiceFaceFiveFile(),
      this.dashStyle.getImageDiceFaceFiveFile().name
    );
    formData.append('date_modified', new Date().toISOString());
    formData.append('is_active', 'true');
    formData.append('game_id', '1');
    return formData;
  }

  updateDiceFaceSix(): FormData {
    let formData: FormData = new FormData();
    formData.append('id', '1');
    formData.append(
      'image_dice_face_six',
      this.dashStyle.getImageDiceFaceSixFile(),
      this.dashStyle.getImageDiceFaceSixFile().name
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
