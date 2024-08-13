import { TicketConfigurationService } from 'src/app/servicios/ticket-configuration/ticket-configuration.service';
import { Component, Input, OnInit } from '@angular/core';
import { GameService } from 'src/app/servicios/game/game.service';

@Component({
  selector: 'app-tickect-qr',
  templateUrl: './tickect-qr.component.html',
  styleUrls: ['./tickect-qr.component.css']
})
export class TickectQRComponent implements OnInit {

  @Input() logo = '';
  @Input() title = '';
  @Input() description = '';
  @Input() startdate = '';
  @Input() enddate = '';

  @Input() codigoQR: string = '';
  @Input() QRdata: string = '';

  @Input() fechaFormateada: string = '';

  constructor(
    private GameSrv: GameService,
    private QrConfigSrv: TicketConfigurationService
  ) { }

  ngOnInit(): void {

    this.GameSrv.getById(1).subscribe((res: any) => {
      this.startdate = res.start_date.split('T')[0].split('-').reverse().join('/');
      this.enddate = res.end_date.split('T')[0].split('-').reverse().join('/');
    });

    this.QrConfigSrv.getTicketConfiguration().subscribe((res: any) => {
      this.logo = res.logo;
      this.title = res.title;
      this.description = res.description;
    });

    // Obtener la fecha actual
    const fechaActual = new Date();

    // Formatear la fecha en un formato legible (por ejemplo, "DD/MM/YYYY")
    const dia = String(fechaActual.getDate()).padStart(2, '0');
    const mes = String(fechaActual.getMonth() + 1).padStart(2, '0'); // Los meses comienzan desde 0
    const anio = fechaActual.getFullYear();

    this.fechaFormateada = `${dia}/${mes}/${anio}`;
  }

}
