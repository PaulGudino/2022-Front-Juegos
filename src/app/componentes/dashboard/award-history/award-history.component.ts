import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GameDateService } from 'src/app/servicios/game-date/game-date.service';

@Component({
  selector: 'app-award-history',
  templateUrl: './award-history.component.html',
  styleUrls: ['./award-history.component.css']
})
export class AwardHistoryComponent implements OnInit {

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
  dataSource !: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(
    private gameDataSrv: GameDateService,
  ) { }

  ngOnInit(): void {
  }
  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  filter(filter: string){
    // this.cargarPremios(filter);
  }
  date_filter(){
    console.log(this.range.value.start)
    console.log(this.range.value.end)
    if(this.range.value.start || this.range.value.end){
      let start : any = this.range.get('start')?.value;
      let end : any = this.range.get('end')?.value;
      let start_date = this.gameDataSrv.DateFormat(start).split('T')[0];
      let end_date = this.gameDataSrv.DateFormat(end).split('T')[0];
      console.log(start_date)
      console.log(end_date)
      let filter = '?created__date__range='+start_date+'%2C'+end_date
      // this.cargarPremios(filter);
    }else{
      // this.cargarPremios(this.filter_default);
    }
  }
  date_filter2(){
    this.range.get('start')?.setValue(null);
    this.range.get('end')?.setValue(null);
    // this.cargarPremios(this.filter_default);
  }
}
