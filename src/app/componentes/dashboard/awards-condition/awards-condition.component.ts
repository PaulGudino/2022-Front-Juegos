import { PuenteDatosService } from 'src/app/servicios/comunicacio_componentes/puente-datos.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AwardsConditionService } from 'src/app/servicios/awards-condition/awards-condition.service';
import { AwardsService } from 'src/app/servicios/awards/awards.service';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
import { PermisosService } from 'src/app/servicios/permisos/permisos.service';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-awards-condition',
  templateUrl: './awards-condition.component.html',
  styleUrls: ['./awards-condition.component.css']
})
export class AwardsConditionComponent implements OnInit {

  Filters = [
    {id: '?is_approved=false', name: 'Premios Condicionados Pendientes'},
    {id: '?is_approved=true', name: 'Premios Condicionados Finalizados'},
    {id: '?ordering=created', name: 'Ultimos Premios Condicionados Creados'},
    {id: '?ordering=-created', name: 'Primeros Premios Condicionados Creados'}
  ]

  filter_default = '?ordering=created'

  Titulo = "Premios Condicionados";
  displayedColumns: string[] = ['id', 'award', 'game','start_date','end_date', 'is_approved', 'Acciones']
  dataSource !: MatTableDataSource<any>;
  permisos:any = [];
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private snackbar: SnackbarService,
    private dialogService: ConfirmDialogService,
    private permisos_api: PermisosService,
    private premiosCondicionSrv: AwardsConditionService,
    private staticData: PuenteDatosService
  ) { }

  ngOnInit(): void {
    this.staticData.setMenuTragamonedas();
    this.cargarPremios(this.filter_default);
  }
  cargarPremios(filter:string){
    this.premiosCondicionSrv.getAwardConditionFilter(filter).subscribe((data:any) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  filter(filter: string){
    this.cargarPremios(filter);
  }
  agregarPremios(){
    this.router.navigate(['dashboard/premios/condicion/crear']);
  }
  verPremios(id: number){
    this.router.navigate(['dashboard/premios/condicion/visualizar', id]);
  }
  editarPremios(id: number){
    let canEdit
    this.premiosCondicionSrv.getAwardConditionbyId(id).subscribe(
      (data: any) => {
        canEdit = data.is_approved
        if (canEdit){
          this.dialogService.error(['No se puede editar un premio condicionado ya reclamado'])
        }else{
          this.router.navigate(['dashboard/premios/condicion/editar', id]);
        }
      }
    )
    
  }
  async eliminarPremios(id: number){
    await this.Permisoeliminar();
    console.log(this.permisos.length);
    if (this.permisos.length > 0) {
      const options = {
        title: 'ELIMINAR PREMIO',
        message: '¿ESTA SEGURO QUE DESEA ELIMINAR EL PREMIO?',
        cancelText: 'CANCELAR',
        confirmText: 'CONFIRMAR'
      };
      this.dialogService.open(options);
      this.dialogService.confirmed().subscribe(confirmed => {
        if (confirmed) {
          this.premiosCondicionSrv.deleteAwardCondition(id).subscribe(
            (data) => {
            this.snackbar.mensaje("Premio Condicionado Eliminado Existosamente");
            this.cargarPremios(this.filter_default);
          },
          (err) => {
            this.dialogService.error(err.error)
            this.cargarPremios(this.filter_default);
          });
        }
      });
    } else {
      this.snackbar.mensaje('No tienes permisos para Eliminar Premios Condicionados');
    }
  }
  async Permisoeliminar(){
    let rolId = Number(sessionStorage.getItem('rol_id'));
    let permiso = await lastValueFrom(this.permisos_api.getPermisosbyName('Eliminar Condicion de Premio'));
    let permissionId = Number(permiso[0].id);
    const promise = await lastValueFrom(this.permisos_api.getPermisosbyRolandPermission(rolId, permissionId));
    this.permisos = promise;
  }
}
