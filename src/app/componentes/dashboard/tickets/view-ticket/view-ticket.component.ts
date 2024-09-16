import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
import { TicketService } from 'src/app/servicios/ticket/ticket.service';
import { Ticket } from 'src/app/interfaces/ticket/Ticket';
import { PuenteDatosService } from 'src/app/servicios/comunicacio_componentes/puente-datos.service';
import { firstValueFrom, Observable } from 'rxjs';


@Component({
  selector: 'app-view-ticket',
  templateUrl: './view-ticket.component.html',
  styleUrls: ['./view-ticket.component.css']
})
export class ViewTicketComponent implements OnInit {

  singularName : string = 'ticket';
  pluralName : string = 'tickets';
  actionName : string = 'visualizar';
  samedate = false;
  QRdata : string = '';
  ticket : Ticket = {
    id : '',
    invoice_number : '',
    date_created : '',
    date_ticket_played : '',
    qr_code_digits : '',
    state : '',
    client : '',
    game_id : '',
    game_name : '',
    user_register : '',
    client_cedula : '',
    client_id : '',
    game_start : '',
    game_end : ''
  };

  fechaActual = new Date();

  // Formatear la fecha en un formato legible (por ejemplo, "DD/MM/YYYY")
  dia = String(this.fechaActual.getDate()).padStart(2, '0');
  mes = String(this.fechaActual.getMonth() + 1).padStart(2, '0'); // Los meses comienzan desde 0
  anio = this.fechaActual.getFullYear();

  fechaFormateada = `${this.dia}/${this.mes}/${this.anio}`;


  constructor(
    private router : Router,
    private activedRoute : ActivatedRoute,
    private ticketAPI : TicketService,
    private staticData: PuenteDatosService,
    private snackBar : SnackbarService,
  ) {}

  toList(): void {
    this.router.navigate(['dashboard/' + this.pluralName]);
  }

  ngOnInit(): void {
    this.staticData.setMenuGeneral();
    let ticketId = this.activedRoute.snapshot.paramMap.get('id');
    this.ticketAPI.getById(Number(ticketId)).subscribe((data) => {
      this.ticket = data;
      this.QRdata = data.qr_code_digits.toString();
      if (this.ticket.date_created == this.ticket.date_ticket_played){
        this.samedate = true;
      }
    })
    

  }

  printTicket(){
    const qrCanvas = document.querySelector('#qrcode canvas') as HTMLCanvasElement; // Selecciona el canvas del QR generado

    if (qrCanvas) {
        const qrImageBase64 = qrCanvas.toDataURL('image/png');  // Convierte el QR a base64
        const printWindow = window.open('', '', 'width=600,height=400');

        if (printWindow) {
            printWindow.document.write(`
              <html>
              <head>
                  <title>Ticket de Promoción</title>
                  <style>
                      .ticket_container {
                          width: 100%;
                          max-width: 600px;
                          margin: 0 auto;
                          padding: 15px;
                          background: #fff;
                          text-align: center;
                          page-break-inside: avoid;
                      }

                      .logo_container {
                          margin-bottom: 10px;
                          width: 100%;
                          height: auto;
                      }

                      .logo_container img {
                          width: 150px;
                          height: auto;
                          border-radius: 10px;
                          object-fit: contain;
                      }

                      .container_img {
                          display: flex;
                          justify-content: center;
                          align-items: center;
                          margin-top: 10px;
                      }

                      .qrcode img {
                          width: 300px;
                          height: 300px;
                      }

                      .title_container {
                          width: 100%;
                          margin-bottom: 10px;
                      }

                      h2 {
                          font-size: 25px;
                          margin: 10px 0;
                      }

                      .text_default {
                          font-size: 25px;
                      }

                      @media print {
                          body {
                              margin: 0;
                              padding: 0;
                              box-shadow: none;
                          }
                      }
                  </style>
              </head>
              <body onload="window.print(); window.close();">
                  <div class="ticket_container">
                      <div class="logo_container">
                          <img src="../../../../assets/img/funny-logo.png" alt="logo">
                      </div>
                      <div class="title_container">
                          <h2>Código Qr:&nbsp;&nbsp; ${this.ticket.qr_code_digits}</h2>
                      </div>
                      <div class="container_img">
                          <div class="qrcode">
                              <img src="${qrImageBase64}" alt="QR Code">
                          </div>
                      </div>
                      <div class="text_default">
                        <p>
                          Promoción válida únicamente el <br>${this.fechaFormateada}
                        </p>
                        <p>
                          Gana premios jugando
                        </p>
                      </div>
                  </div>
              </body>
              </html>
            `);
            printWindow.document.close();
        } else {
          console.log('No se pudo abrir la ventana de impresión.');
        }
    } else {
      this.snackBar.mensaje('No se encontró el código QR.');
    }
}

}

