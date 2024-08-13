import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog'; // Importa MatDialogModule
import { MatSnackBarModule } from '@angular/material/snack-bar'; // Importa MatSnackBarModule
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importa HttpClientTestingModule

import { DesignDoorsComponent } from './design-doors.component';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service'; // Asegúrate de que la ruta sea correcta
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service'; // Asegúrate de que la ruta sea correcta

describe('DesignDoorsComponent', () => {
  let component: DesignDoorsComponent;
  let fixture: ComponentFixture<DesignDoorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule, // Añade MatDialogModule
        MatSnackBarModule, // Añade MatSnackBarModule
        HttpClientTestingModule // Añade HttpClientTestingModule si es necesario
      ],
      declarations: [DesignDoorsComponent],
      providers: [
        ConfirmDialogService, // Asegúrate de proporcionar el servicio si es necesario
        SnackbarService // Asegúrate de proporcionar el servicio si es necesario
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesignDoorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
