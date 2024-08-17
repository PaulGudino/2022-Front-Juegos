import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar'; // Importa MatSnackBarModule

import { AddPublicityComponent } from './add-publicity.component';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service'; // Asegúrate de importar tus servicios

describe('AddPublicityComponent', () => {
  let component: AddPublicityComponent;
  let fixture: ComponentFixture<AddPublicityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPublicityComponent ],
      imports: [
        MatSnackBarModule // Agrega MatSnackBarModule
      ],
      providers: [
        SnackbarService // Agrega el servicio si es necesario para las pruebas
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPublicityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
