import { TicketService } from './../../../../servicios/ticket/ticket.service';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
import { MatchService } from 'src/app/servicios/match/match.service';
import { PuenteDatosService } from 'src/app/servicios/comunicacio_componentes/puente-datos.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/servicios/client/client.service';
import { Client } from 'src/app/interfaces/client/Client';
import { lastValueFrom } from 'rxjs';
import { PermisosService } from 'src/app/servicios/permisos/permisos.service';


@Component({
  selector: 'app-view-client',
  templateUrl: './view-client.component.html',
  styleUrls: ['./view-client.component.css']
})
export class ViewClientComponent implements OnInit {

  clientId = this.activedRoute.snapshot.paramMap.get('id');
  singularName : string = 'cliente';
  pluralName : string = 'clientes';
  actionName : string = 'visualizar';

  Filters = [
    // {id: '?state=Activo', name: 'Clientes Activos'},
    // {id: '?state=Inactivo', name: 'Clientes Inactivos'},
    {id: '?ticket__client__id='+this.clientId+'&win_match=true', name: 'Partidas Ganadas'},
    {id: '?ticket__client__id='+this.clientId+'&win_match=false', name: 'Partidas Perdidas'},
    {id: '?ordering=date_created&ticket__client__id='+this.clientId , name: 'Primeras Partidas Jugadas'},
    {id: '?ordering=-date_created&ticket__client__id='+this.clientId , name: 'Últimas Partidas Jugadas'},
    {id: '?ticket__client__id='+this.clientId+'&win_match=true&delivered=false', name: 'Partidas Ganadas con Premios No Entregados'},
  ]
  default_filter = '?ordering=-date_created&ticket__client__id='+this.clientId

  client : Client = {
    id : '',
    cedula : '',
    names : '',
    surnames : '',
    email : '',
    phone : '',
    sex : '',
    address : '',
    // state : '',
    user_client_register : '',
    user_client_modify : '',
    created : '',
    modified : '',
    client: '',
  };
  client_history : any
  ticket_client_avilable : any
  len_ticket_available : number = 0
  len_match : number = 0

  winner_client : number = 0
  loser_client : number = 0

  constructor(
    private router : Router,
    private activedRoute : ActivatedRoute,
    private clientAPI : ClientService,
    private staticData: PuenteDatosService,
    private matchSrv: MatchService,
    private dialogService: ConfirmDialogService,
    private snackSrv: SnackbarService,
    private ticketSrv: TicketService,
    private permisos_api: PermisosService,
  ) {}

  toList() {
    this.router.navigate(['dashboard/' + this.pluralName]);
  }

  ngOnInit(): void {
    this.staticData.setMenuGeneral();
    this.SummnaryClient();
    this.clientAPI.getById(Number(this.clientId)).subscribe((data) => {
      this.client = data;
    })
    this.getClientHistory(this.default_filter)
    this.getTicketAvailable()
  }
  getClientHistory(string:any){
    this.matchSrv.getMatchFilterClientHistory(string).subscribe(
      (data:any)=>{
        this.client_history = data
        this.len_match = Object.keys(data).length;
      }
    )
  }

  getTicketAvailable(){
    let filter = '?state=Disponible&client__id='+this.clientId
    this.ticketSrv.getFilter(filter).subscribe(
      (data:any)=>{
        this.ticket_client_avilable = data
        this.len_ticket_available = Object.keys(data).length;
      }
    )
  }

  filter(filter: string) {
    this.getClientHistory(filter);
  }
  async deliveryAward(id:string){
    
    const options = {
      title: 'ENTREGAR PREMIO',
      message: '¿ESTÁ SEGURO QUE DESEA CAMBIAR ENTREGAR EL PREMIO?',
      cancelText: 'CANCELAR',
      confirmText: 'ENTREGAR'
    };
    this.dialogService.open(options);
    this.dialogService.confirmed().subscribe(async confirmed => {
      if (confirmed) {
        let formData : FormData = new FormData();
        formData.append('delivery', 'true');
        this.matchSrv.changeDelivered(id, formData).subscribe(
          data=>{
            this.snackSrv.mensaje('Se cambió el estado de la entrega del premio')
            this.getClientHistory(this.default_filter)
          }
        )
      }
    });
    
  }
  async viewInformation(id:any){
    let promise = await this.Permisos('Ver Ticket')
    if (promise.length > 0){
      this.router.navigate(['/dashboard/tickets/vizualizar/'+ id]);
    }else{
      this.snackSrv.mensaje('No tienes permisos para Ver Ticket');
    }
  }
  async printTicket(id:string){
    let promise = await this.Permisos('Imprimir Ticket')
    if (promise.length > 0){
        alert('Imprimiendo Ticket '+id)
    }else{
      this.snackSrv.mensaje('No tienes permisos para Imprimir Ticket');
    }
  }

  SummnaryClient(){
    this.matchSrv.getMatchFilterClientHistory('?ticket__client__id='+this.clientId+'&win_match=true').subscribe(
      (data:any)=>{
        this.winner_client = Object.keys(data).length;
      }
    )
    this.matchSrv.getMatchFilterClientHistory('?ticket__client__id='+this.clientId+'&win_match=false').subscribe(
      (data:any)=>{
        this.loser_client = Object.keys(data).length;
      }
    )
  }
  async Permisos(name:string){
    let rolId = Number(sessionStorage.getItem('rol_id'));
    let permiso = await lastValueFrom(this.permisos_api.getPermisosbyName(name));
    let permissionId = Number(permiso[0].id);
    const promise = await lastValueFrom(this.permisos_api.getPermisosbyRolandPermission(rolId, permissionId));
    return promise;
  }
}

