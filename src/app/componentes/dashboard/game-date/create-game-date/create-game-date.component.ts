import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
import { GameService } from 'src/app/servicios/game/game.service';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';

@Component({
  selector: 'app-create-game-date',
  templateUrl: './create-game-date.component.html',
  styleUrls: ['./create-game-date.component.css']
})
export class CreateGameDateComponent implements OnInit {

  minDate = new Date();
  minDatefin  = new Date();

  startDate: Date = new Date();
  endDate: Date = new Date();

  form: FormGroup;
  beginDate: Date = new Date();
  finishDate: Date = new Date();
  constructor(
     private snackbar:SnackbarService,
     private dialogService: ConfirmDialogService,
     private game:GameService,
     private fb: FormBuilder,
  ) {
     this.form = this.fb.group({
        startTime:['', Validators.required],
        endTime:['', Validators.required],
      })
   }

  ngOnInit(): void {
  }

  async changetime(){
     let hora_inicio = this.form.value.startTime.hour
     let minuto_inicio = this.form.value.startTime.minute
 
     let hora_fin = this.form.value.endTime.hour
     let minuto_fin = this.form.value.endTime.minute
   
 
     let inicio_date = this.beginDate.toISOString().split('T')[0];
     const [year_i, month_i, day_i] = inicio_date.split('-');
 
     let fin_date = this.finishDate.toISOString().split('T')[0];
     const [year_f, month_f, day_f] = fin_date.split('-');
 
     this.startDate = new Date(parseInt(year_i), parseInt(month_i) - 1, parseInt(day_i), parseInt(hora_inicio), parseInt(minuto_inicio));
     this.endDate = new Date(parseInt(year_f), parseInt(month_f) - 1, parseInt(day_f), parseInt(hora_fin), parseInt(minuto_fin));
   }

   async create(){
   
     if (this.form.valid) {

        await this.changetime();

     }else{
       this.snackbar.mensaje('Complete todos los campos');
     }
   }
  cancel(){

  }


}
