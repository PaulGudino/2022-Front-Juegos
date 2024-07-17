import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GameLogicService } from '../service/gameLogic/game-logic.service';

@Component({
  selector: 'app-result-message',
  templateUrl: './result-message.component.html',
  styleUrls: ['./result-message.component.css']
})
export class ResultMessageComponent implements OnInit {

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<ResultMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data:{
      title : string;
      image : string;
      result_music : string;
    },
    private gameLogicService: GameLogicService
  ) { }

  ngOnInit(): void {
    console.log(this.data)
  }
  cerrar(){
    this.dialogRef.close();
    if (this.gameLogicService.attempts === 0){
      this.navigateTo("")
    }
    if(this.gameLogicService.winFirstTime){
      this.navigateTo("")
    }
  }

  navigateTo(gameName: string) {
    this.router.navigate([`/${gameName}`]);
  }

}
