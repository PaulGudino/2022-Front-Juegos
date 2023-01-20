import { MatchService } from './../../../servicios/match/match.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GameDateService } from 'src/app/servicios/game-date/game-date.service';
import { PuenteDatosService } from 'src/app/servicios/comunicacio_componentes/puente-datos.service';
import { Router } from '@angular/router';

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
    {id: '?date_created__date__range=&delivered=&ordering=date_created&ticket__client__id=&win_match=true', name: 'Ordenado Ascendente'},
    {id: '?date_created__date__range=&delivered=&ordering=-date_created&ticket__client__id=&win_match=true', name: 'Ordenado Descendente'},
  ]
  filter_default = '?date_created__date__range=&delivered=&ordering=-date_created&ticket__client__id=&win_match=true'

  Titulo = "Historial de Premios Ganados";

  displayedColumns: string[] = ['emision_date_match','client_player', 'invoice_number','ticket', 'qr','win_award_id', 'win_award','win_award_category','delivered_award',]
  dataSource !: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(
    private gameDataSrv: GameDateService,
    private matchSrv: MatchService,
    private staticData: PuenteDatosService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.staticData.setMenuGeneral();
    this.loadMatch(this.filter_default);
  }
  loadMatch(filter:string){
    this.matchSrv.getMatchFilterClientHistory(filter).subscribe((data:any) => {
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
    this.loadMatch(filter);
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
      let filter = '?win_match=true&date_created__date__range='+start_date+'%2C'+end_date
      this.loadMatch(filter);
    }else{
      this.loadMatch(this.filter_default);
    }
  }
  date_filter2(){
    this.range.get('start')?.setValue(null);
    this.range.get('end')?.setValue(null);
    this.loadMatch(this.filter_default);
  }
  toAward(){
    this.router.navigate(['/dashboard/premios/']);
  }
}
