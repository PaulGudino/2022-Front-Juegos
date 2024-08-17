export interface GameCurrentSession_Data {
  id: number;
  kiosko_numero: string;
  ticket_id: number; // Ajusta el tipo según el tipo real en tu backend
  game_id: number; // Ajusta el tipo según el tipo real en tu backend
  gano: boolean;
  award_id: number | null; // Ajusta el tipo según el tipo real en tu backend
  fecha_hora_startgame: string; // Ajusta el tipo según el tipo real en tu backend (string o Date)
  fecha_hora_finalgame: string | null; // Ajusta el tipo según el tipo real en tu backend (string o Date)
}