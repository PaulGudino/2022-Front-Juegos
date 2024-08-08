import { Injectable } from '@angular/core';
import { Styles } from '../../../interfaces/styles/Styles'

@Injectable({
   providedIn: 'root'
})
export class DashboardStyleService {
   // --------------- Tragamonedas ------------------
   imageBackgroundTragamonedasFile!: File
   imageLogoTragamonedasFile!: File;
   imageMachineGameFile!: File;

   // --------------- Puertas ------------------
   imageDoorLeftFile!: File;
   imageDoorCenterFile!: File;
   imageDoorRightFile!: File;
   imageBackgroundPuertasFile!: File;
   imageLogoPuertasFile!: File;

   // --------------- Dados ------------------
   imageDiceFaceOneFile!: File;
   imageDiceFaceTwoFile!: File;
   imageDiceFaceThreeFile!: File;
   imageDiceFaceFourFile!: File;
   imageDiceFaceFiveFile!: File;
   imageDiceFaceSixFile!: File;
   imageBackgroundDadosFile!: File;
   imageLogoDadosFile!: File;

   // --------------- Precision ------------------
   imageBoxWatchFile!: File;
   imageBackgroundPrecisionFile!: File;
   imageLogoPrecisionFile!: File;

   // --------------- General ----------------
   imageWinnerGameFile!: File;
   imageLogoFile!: File;
   videoScreensaverFile!: File;
   previewFontLetter: string = '';

   style: Styles = {
      id: 1,
      game_id: 1,
      color_text: '',
      font_letter: '',
      image_logo: './assets/img/funny-logo.png',
      color_background_game: '',


      // --------------- Tragamonedas ------------------
      image_machine_game: '',
      image_logo_tragamonedas: '',
      image_background_tragamonedas: '',

      // --------------- Puertas ------------------
      image_door_left: '',
      image_door_center: '',
      image_door_right: '',
      image_background_puertas: '',
      image_logo_puertas: '',

      // --------------- Dados ------------------
      image_dice_face_one: '',
      image_dice_face_two: '',
      image_dice_face_three: '',
      image_dice_face_four: '',
      image_dice_face_five: '',
      image_dice_face_six: '',
      image_background_dados: '',
      image_logo_dados: '',
      // --------------- Precision ------------------
      image_box_watch: '',
      image_background_precision: '',
      image_logo_precision: '',

      // --------------- General ------------------

      video_screensaver: '',
      video_autoplay: true,
      video_loop: true,
      title_button_screensaver: '',

      scan_code_title: '',
      scan_code_description: '',

      title_winner: '',
      description_winner: '',
      image_winner: '',

      date_created: new Date(),
      date_modified: new Date(),
      is_active: true,
   }

   constructor() { }

   loadData(style: Styles) {
      this.style = style;
   }

   getTitleButtonScreensaver(): string {
      return this.style.title_button_screensaver;
   }
   getLogoUrl(): string {
      if (this.style.image_logo != undefined) {
         return this.style.image_logo;

      } else
         return '';
   }
   getStyles() {
      return this.style
   }
   // --------------- Tragamonedas ------------------
   getImageBackgroundTragamonedasFile() {
      return this.style.image_background_tragamonedas;
   }
   setImageBackgroundTragamonedasFile(file: any) {
      this.style.image_background_tragamonedas = file;
   }

   getImageMachineGameFile() {
      return this.imageMachineGameFile;
   }
   setImageMachineGameFile(file: any) {
      this.imageMachineGameFile = file
   }

   getImageLogoTragamonedasFile() {
      return this.imageLogoTragamonedasFile
   }
   setImageLogoTragamonedasFile(file: any) {
      this.imageLogoTragamonedasFile = file
   }

   // --------------- Puertas ------------------
   getImageDoorLeftFile() {
      return this.imageDoorLeftFile;
   }
   setImageDoorLeftFile(file: any) {
      this.imageDoorLeftFile = file
   }

   getImageDoorCenterFile() {
      return this.imageDoorCenterFile;
   }
   setImageDoorCenterFile(file: any) {
      this.imageDoorCenterFile = file
   }

   getImageDoorRightFile() {
      return this.imageDoorRightFile;
   }
   setImageDoorRightFile(file: any) {
      this.imageDoorRightFile = file
   }

   getImageBackgroundPuertasFile() {
      return this.imageBackgroundPuertasFile;
   }
   setImageBackgroundPuertasFile(file: any) {
      this.imageBackgroundPuertasFile = file
   }

   getImageLogoPuertasFile() {
      return this.imageLogoPuertasFile;
   }
   setImageLogoPuertasFile(file: any) {
      this.imageLogoPuertasFile = file
   }


   // --------------- Dados ------------------
   getImageDiceFaceOneFile() {
      return this.imageDiceFaceOneFile;
   }
   setImageDiceFaceOneFile(file: any) {
      this.imageDiceFaceOneFile = file
   }

   getImageDiceFaceTwoFile() {
      return this.imageDiceFaceTwoFile;
   }
   setImageDiceFaceTwoFile(file: any) {
      this.imageDiceFaceTwoFile = file
   }

   getImageDiceFaceThreeFile() {
      return this.imageDiceFaceThreeFile;
   }
   setImageDiceFaceThreeFile(file: any) {
      this.imageDiceFaceThreeFile = file
   }

   getImageDiceFaceFourFile() {
      return this.imageDiceFaceFourFile;
   }
   setImageDiceFaceFourFile(file: any) {
      this.imageDiceFaceFourFile = file
   }

   getImageDiceFaceFiveFile() {
      return this.imageDiceFaceFiveFile;
   }
   setImageDiceFaceFiveFile(file: any) {
      this.imageDiceFaceFiveFile = file
   }

   getImageDiceFaceSixFile() {
      return this.imageDiceFaceSixFile;
   }
   setImageDiceFaceSixFile(file: any) {
      this.imageDiceFaceSixFile = file
   }

   getImageBackgroundDadosFile() {
      return this.imageBackgroundDadosFile;
   }
   setImageBackgroundDadosFile(file: any) {
      this.imageBackgroundDadosFile = file
   }

   getImageLogoDadosFile() {
      return this.imageLogoDadosFile;
   }
   setImageLogoDadosFile(file: any) {
      this.imageLogoDadosFile = file
   }  


   // --------------- Precision ------------------

   getImageBoxWatchFile() {
      return this.imageBoxWatchFile;
   }
   setImageBoxWatchFile(file: any) {
      this.imageBoxWatchFile = file
   }

   getImageBackgroundPrecisionFile() {
      return this.imageBackgroundPrecisionFile;
   }
   setImageBackgroundPrecisionFile(file: any) {
      this.imageBackgroundPrecisionFile = file
   }

   getImageLogoPrecisionFile() {
      return this.imageLogoPrecisionFile;
   }
   setImageLogoPrecisionFile(file: any) {
      this.imageLogoPrecisionFile = file
   }


   // --------------- General ------------------
   getImageWinnerGameFile() {
      return this.imageWinnerGameFile;
   }
   setImageWinnerGameFile(file: any) {
      this.imageWinnerGameFile = file
   }
   getImageLogoFile() {
      return this.imageLogoFile
   }
   setImageLogoFile(file: any) {
      this.imageLogoFile = file
   }
   getVideoScreensaverFile() {
      return this.videoScreensaverFile;
   }
   setVideoScreensaverFile(file: any) {
      this.videoScreensaverFile = file
   }

   getPreviewFontLetter() {
      return this.previewFontLetter;
   }
   setPreviewFontLetter(font: string) {
      this.previewFontLetter = font
   }

   public get_video_screensaver(): string {
      return this.style.video_screensaver;
   }

   public set_video_screensaver(video: string): void {
      this.style.video_screensaver = video;
   }

   public get_title_button_screensaver() {
      return this.style.title_button_screensaver;
   }

   public set_title_button_screensaver(title: string): void {
      this.style.title_button_screensaver = title;
   }


   // --------------- Tragamonedas ------------------
   public get_image_background_tragamonedas() {
      return this.style.image_background_tragamonedas;
   }
   public set_image_background_tragamonedas(image: any) {
      this.style.image_background_tragamonedas = image;
   }

   public get_image_logo_tragamonedas() {
      return this.style.image_logo_tragamonedas;
   }
   public set_image_logo_tragamonedas(image: any) {
      this.style.image_logo_tragamonedas = image;
   }

   public get_image_machine_game() {
      return this.style.image_machine_game;
   }
   public set_image_machine_game(image: any) {
      this.style.image_machine_game = image;
   }

   // --------------- Puertas ------------------
   public get_image_door_left() {
      return this.style.image_door_left;
   }

   public set_image_door_left(image: any) {
      this.style.image_door_left = image;
   }

   public get_image_door_center() {
      return this.style.image_door_center;
   }

   public set_image_door_center(image: any) {
      this.style.image_door_center = image;
   }

   public get_image_door_right() {
      return this.style.image_door_right;
   }

   public set_image_door_right(image: any) {
      this.style.image_door_right = image;
   }

   public get_image_background_puertas() {
      return this.style.image_background_puertas;
   }
   public set_image_background_puertas(image: any) {
      this.style.image_background_puertas = image;
   }

   public get_image_logo_puertas() {
      return this.style.image_logo_puertas;
   }
   public set_image_logo_puertas(image: any) {
      this.style.image_logo_puertas = image;
   }

   // --------------- Dados ------------------

   public get_image_dice_face_one() {
      return this.style.image_dice_face_one;
   }

   public set_image_dice_face_one(image: any) {
      this.style.image_dice_face_one = image;
   }

   public get_image_dice_face_two() {
      return this.style.image_dice_face_two;
   }

   public set_image_dice_face_two(image: any) {
      this.style.image_dice_face_two = image;
   }

   public get_image_dice_face_three() {
      return this.style.image_dice_face_three;
   }

   public set_image_dice_face_three(image: any) {
      this.style.image_dice_face_three = image;
   }

   public get_image_dice_face_four() {
      return this.style.image_dice_face_four;
   }

   public set_image_dice_face_four(image: any) {
      this.style.image_dice_face_four = image;
   }

   public get_image_dice_face_five() {
      return this.style.image_dice_face_five;
   }

   public set_image_dice_face_five(image: any) {
      this.style.image_dice_face_five = image;
   }

   public get_image_dice_face_six() {
      return this.style.image_dice_face_six;
   }

   public set_image_dice_face_six(image: any) {
      this.style.image_dice_face_six = image;
   }

   public get_image_background_dados() {
      return this.style.image_background_dados;
   }

   public set_image_background_dados(image: any) {
      this.style.image_background_dados = image;
   }

   public get_image_logo_dados() {
      return this.style.image_logo_dados;
   }

   public set_image_logo_dados(image: any) {
      this.style.image_logo_dados = image;
   }

   // --------------- Precision ------------------

   public get_image_box_watch() {
      return this.style.image_box_watch;
   }

   public set_image_box_watch(image: any) {
      this.style.image_box_watch = image;
   }

   public get_image_background_precision() {
      return this.style.image_background_precision;
   }

   public set_image_background_precision(image: any) {
      this.style.image_background_precision = image;
   }

   public get_image_logo_precision() {
      return this.style.image_logo_precision;
   }

   public set_image_logo_precision(image: any) {
      this.style.image_logo_precision = image;
   }

   // --------------- General ------------------
   public get_image_logo(){
      return this.style.image_logo;
   }
   public set_image_logo(image: any){
      this.style.image_logo = image;
   }

   public get_color_background_game() {
      return this.style.color_background_game;
   }

   public set_color_background_game(newColor: string) {
      this.style.color_background_game = newColor;
   }

   public get_color_text() {
      return this.style.color_text;
   }

   public set_color_text(color: string) {
      this.style.color_text = color;

   }

   public get_title_winner() {
      return this.style.title_winner
   }

   public set_title_winner(title: string) {
      this.style.title_winner = title;
   }

   public get_scan_code_title() {
      return this.style.scan_code_title
   }

   public set_scan_code_title(title: string) {
      this.style.scan_code_title = title;
   }
   public get_scan_code_description() {
      return this.style.scan_code_description;
   }

   public set_scan_code_description(description: string) {
      this.style.scan_code_description = description;
   }

   public get_description_winner() {
      return this.style.description_winner
   }

   public set_description_winner(description: string) {
      this.style.description_winner = description;
   }

   public get_date_created() {
      return this.style.date_created
   }
   public get_image_winner() {
      return this.style.image_winner;
   }
   public get_font_letter() {
      return this.style.font_letter;
   }

   public set_modified_date(newDate: Date) {
      this.style.date_modified = newDate;
   }

   public get_is_active() {
      return this.style.is_active
   }

}
