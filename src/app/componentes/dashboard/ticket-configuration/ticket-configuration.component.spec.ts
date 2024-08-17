import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; // Agrega MatDialogModule
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { TicketConfigurationComponent } from './ticket-configuration.component';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service'; // Asegúrate de importar el servicio

describe('TicketConfigurationComponent', () => {
  let component: TicketConfigurationComponent;
  let fixture: ComponentFixture<TicketConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketConfigurationComponent ],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        MatDialogModule, // Agrega MatDialogModule
        MatSnackBarModule
      ],
      providers: [
        MatDialog, // Proporciona MatDialog
        ConfirmDialogService // Proporciona el servicio de diálogo de confirmación
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
