import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar'; // Importa MatSnackBarModule

import { ProbabilidadesComponent } from './probabilidades.component';

describe('ProbabilidadesComponent', () => {
  let component: ProbabilidadesComponent;
  let fixture: ComponentFixture<ProbabilidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProbabilidadesComponent ],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatSnackBarModule // Añade MatSnackBarModule aquí
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProbabilidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
