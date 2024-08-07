import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs'; // Importa 'of' y 'throwError' para crear observables simulados
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { CambiarContraseniaComponent } from './cambiar-contrasenia.component';
import { ApiService } from 'src/app/servicios/user/user.service';
import { SnackbarService } from './../../../../../servicios/snackbar/snackbar.service';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
import { PuenteDatosService } from 'src/app/servicios/comunicacio_componentes/puente-datos.service';
import { MensajesErrorComponent } from '../../../mensajes-error/mensajes-error.component';

describe('CambiarContraseniaComponent', () => {
  let component: CambiarContraseniaComponent;
  let fixture: ComponentFixture<CambiarContraseniaComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let snackbarServiceSpy: jasmine.SpyObj<SnackbarService>;
  let confirmDialogServiceSpy: jasmine.SpyObj<ConfirmDialogService>;
  let puenteDatosServiceSpy: jasmine.SpyObj<PuenteDatosService>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Crea espías (mocks) para los servicios
    apiServiceSpy = jasmine.createSpyObj('ApiService', ['postCambiarContraseña']);
    snackbarServiceSpy = jasmine.createSpyObj('SnackbarService', ['mensaje']);
    confirmDialogServiceSpy = jasmine.createSpyObj('ConfirmDialogService', ['open', 'confirmed']);
    puenteDatosServiceSpy = jasmine.createSpyObj('PuenteDatosService', ['setMenuGeneral']);
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    // Simula el método 'confirmed' para devolver un observable con valor verdadero
    confirmDialogServiceSpy.confirmed.and.returnValue(of(true));

    await TestBed.configureTestingModule({
      declarations: [ CambiarContraseniaComponent, MensajesErrorComponent ],
      imports: [ ReactiveFormsModule ],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy },
        { provide: SnackbarService, useValue: snackbarServiceSpy },
        { provide: ConfirmDialogService, useValue: confirmDialogServiceSpy },
        { provide: PuenteDatosService, useValue: puenteDatosServiceSpy },
        { provide: MatDialog, useValue: dialogSpy },
        { provide: Router, useValue: routerSpy },
        FormBuilder
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CambiarContraseniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
