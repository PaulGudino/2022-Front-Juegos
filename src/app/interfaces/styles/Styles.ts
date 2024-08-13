export interface Styles {
   
   id: number;
   game_id: number;
   color_text: string;
   font_letter: string;
   color_background_game: string;

   image_machine_game?: any;
   image_box_watch?: any;

   image_dice_face_one?: any;
   image_dice_face_two?: any;
   image_dice_face_three?: any;
   image_dice_face_four?: any;
   image_dice_face_five?: any;
   image_dice_face_six?: any;

   image_door_left?: any;
   image_door_center?: any;
   image_door_right?: any;

   image_logo_tragamonedas?: any;
   image_logo_dados?: any;
   image_logo_puertas?: any;
   image_logo_precision?: any;
   

   image_background_tragamonedas?: string;
   image_background_dados?: string;
   image_background_puertas?: string;
   image_background_precision?: string;

   image_logo?: string;
   
   video_screensaver?: any;
   video_autoplay: boolean;
   video_loop: boolean;
   title_button_screensaver: string;

   scan_code_title: string;
   scan_code_description: string;

   title_winner: string;
   description_winner: string;
   image_winner?: any;

   date_created: Date;
   date_modified: Date;
   is_active: boolean;
}
