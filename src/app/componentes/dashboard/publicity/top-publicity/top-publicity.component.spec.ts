import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importa HttpClientTestingModule
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';

import { TopPublicityComponent } from './top-publicity.component';
import { PublicityService } from 'src/app/servicios/publicity/publicity.service'; // Asegúrate de importar tus servicios

describe('TopPublicityComponent', () => {
  let component: TopPublicityComponent;
  let fixture: ComponentFixture<TopPublicityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopPublicityComponent ],
      imports: [
        HttpClientTestingModule, // Agrega HttpClientTestingModule
        MatDialogModule,
        MatSnackBarModule,
        ReactiveFormsModule
      ],
      providers: [
        PublicityService // Agrega el servicio si es necesario para las pruebas
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopPublicityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
