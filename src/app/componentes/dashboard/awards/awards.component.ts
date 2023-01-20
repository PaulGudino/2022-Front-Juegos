import { PuenteDatosService } from 'src/app/servicios/comunicacio_componentes/puente-datos.service';
import { getAwardList } from './../../../interfaces/awards/getAwardList';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AwardsService } from 'src/app/servicios/awards/awards.service';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
import { lastValueFrom } from 'rxjs';
import { PermisosService } from 'src/app/servicios/permisos/permisos.service';
import { FormControl, FormGroup } from '@angular/forms';
import { GameDateService } from 'src/app/servicios/game-date/game-date.service';

@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.css']
})
export class AwardsComponent implements OnInit {

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  Filters = [
    {id: '?is_active=true', name: 'Premios Activos'},
    {id: '?is_active=false', name: 'Premios Inactivos'},
    {id: '?ordering=-created', name: 'Ultimos Premios Creados'},
    {id: '?ordering=created', name: 'Primeros Premios Creados'},
  ]

  filter_default = '?ordering=-created'

  Titulo = "Premios";
  displayedColumns: string[] = ['id', 'name','initial_stock','condition_stock','prizes_awarded','created','juego', 'is_active', 'Acciones']
  dataSource !: MatTableDataSource<getAwardList>;
  permisos:any = [];
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private snackbar: SnackbarService,
    private premiosSrv: AwardsService,
    private dialogService: ConfirmDialogService,
    private permisos_api: PermisosService,
    private staticData: PuenteDatosService,
    private gameDataSrv: GameDateService,
  ) { }

  ngOnInit(): void {
    this.staticData.setMenuGeneral();
    this.cargarPremios(this.filter_default);
  }
  agregarPremios(){
    this.router.navigate(['/dashboard/premios/crear']);
  }
  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  cargarPremios(filter:string){
    this.premiosSrv.getFilterAward(filter).subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  verPremios(id: number){
    this.router.navigate(['/dashboard/premios/visualizar/'+id]);
  }
  editarPremios(id: number){
    this.router.navigate(['/dashboard/premios/editar/'+id]);
  }
  async eliminarPremios(id: number){
    await this.Permisoeliminar();
    if (this.permisos.length > 0) {
      const options = {
        title: 'ELIMINAR PREMIO',
        message: '¿ESTÁ SEGURO QUE DESEA ELIMINAR EL PREMIO?',
        cancelText: 'CANCELAR',
        confirmText: 'CONFIRMAR'
      };
      this.dialogService.open(options);
      this.dialogService.confirmed().subscribe(confirmed => {
        if (confirmed) {
          this.premiosSrv.deleteAward(id).subscribe(
            (data) => {
            this.snackbar.mensaje("Premio Eliminado Existosamente");
            this.cargarPremios(this.filter_default);
          },
          (err) => {
            this.dialogService.error(err.error)
            this.cargarPremios(this.filter_default);
          });
        }
      });
    } else {
      this.snackbar.mensaje('No tienes permisos para Eliminar Premios');
    }
  }

  async Permisoeliminar(){
    let rolId = Number(sessionStorage.getItem('rol_id'));
    let permiso = await lastValueFrom(this.permisos_api.getPermisosbyName('Eliminar Premio'));
    let permissionId = Number(permiso[0].id);
    const promise = await lastValueFrom(this.permisos_api.getPermisosbyRolandPermission(rolId, permissionId));
    this.permisos = promise;
  }

  filter(filter: string){
    this.cargarPremios(filter);
  }
  date_filter(){
    if(this.range.value.start || this.range.value.end){
      let start : any = this.range.get('start')?.value;
      let end : any = this.range.get('end')?.value;
      let start_date = this.gameDataSrv.DateFormat(start).split('T')[0];
      let end_date = this.gameDataSrv.DateFormat(end).split('T')[0];
      let filter = '?created__date__range='+start_date+'%2C'+end_date
      this.cargarPremios(filter);
    }else{
      this.cargarPremios(this.filter_default);
    }
  }
  date_filter2(){
    this.range.get('start')?.setValue(null);
    this.range.get('end')?.setValue(null);
    this.cargarPremios(this.filter_default);
  }
  toHistory(){
    this.router.navigate(['/dashboard/premios/history/']);
  }
}
