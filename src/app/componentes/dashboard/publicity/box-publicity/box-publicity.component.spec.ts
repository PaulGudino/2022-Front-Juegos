import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog'; // Importa MatDialogModule

import { BoxPublicityComponent } from './box-publicity.component';
import { PublicityService } from 'src/app/servicios/publicity/publicity.service'; // Importa el servicio si es necesario para las pruebas
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service'; // Importa el servicio si es necesario para las pruebas

describe('BoxPublicityComponent', () => {
  let component: BoxPublicityComponent;
  let fixture: ComponentFixture<BoxPublicityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoxPublicityComponent ],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        MatDialogModule // Agrega MatDialogModule
      ],
      providers: [
        // Si necesitas proveer algún servicio específico para las pruebas, agrégalo aquí
        ConfirmDialogService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoxPublicityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
