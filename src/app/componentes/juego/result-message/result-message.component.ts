import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-result-message',
  templateUrl: './result-message.component.html',
  styleUrls: ['./result-message.component.css']
})
export class ResultMessageComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ResultMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data:{
      title : string
      image : string
    }
  ) { }

  ngOnInit(): void {
  }
  cerrar(){
    this.dialogRef.close();
  }
}
