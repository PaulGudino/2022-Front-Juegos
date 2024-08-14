export interface Game {
   id: string;
   start_date: Date;
   end_date: Date;
   modification_date: Date
   name: string;
   players: number;
   state: string;
   is_active: boolean;
}
