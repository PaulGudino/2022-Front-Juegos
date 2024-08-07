import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog'; // Importa MatDialogModule
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { BottomPublicityComponent } from './bottom-publicity.component';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service'; // Importa el servicio si es parte del componente
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service'; // Importa los servicios necesarios

describe('BottomPublicityComponent', () => {
  let component: BottomPublicityComponent;
  let fixture: ComponentFixture<BottomPublicityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BottomPublicityComponent ],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatDialogModule // Agrega MatDialogModule
      ],
      providers: [
        ConfirmDialogService, // Agrega el servicio si es necesario para las pruebas
        SnackbarService // Agrega el servicio si es necesario para las pruebas
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BottomPublicityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
