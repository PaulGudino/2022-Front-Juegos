import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs'; // Asegúrate de importar 'of' para simular observables
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { RolesComponent } from './roles.component';
import { ApiService } from 'src/app/servicios/user/user.service';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
import { RolesService } from 'src/app/servicios/roles/roles.service';
import { PuenteDatosService } from 'src/app/servicios/comunicacio_componentes/puente-datos.service';

describe('RolesComponent', () => {
  let component: RolesComponent;
  let fixture: ComponentFixture<RolesComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let snackbarServiceSpy: jasmine.SpyObj<SnackbarService>;
  let dialogServiceSpy: jasmine.SpyObj<ConfirmDialogService>;
  let rolesServiceSpy: jasmine.SpyObj<RolesService>;
  let puenteDatosServiceSpy: jasmine.SpyObj<PuenteDatosService>;

  beforeEach(async () => {
    apiServiceSpy = jasmine.createSpyObj('ApiService', ['getRolesFilter']);
    snackbarServiceSpy = jasmine.createSpyObj('SnackbarService', ['mensaje']);
    dialogServiceSpy = jasmine.createSpyObj('ConfirmDialogService', ['open', 'confirmed']);
    rolesServiceSpy = jasmine.createSpyObj('RolesService', ['deleteRol']);
    puenteDatosServiceSpy = jasmine.createSpyObj('PuenteDatosService', ['setMenuGeneral', 'geturl']);

    // Configura el observable simulado para 'getRolesFilter'
    apiServiceSpy.getRolesFilter.and.returnValue(of([])); // Devuelve un observable de array vacío

    await TestBed.configureTestingModule({
      declarations: [ RolesComponent ],
      imports: [ 
        HttpClientTestingModule,
        MatDialogModule
      ],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy },
        { provide: SnackbarService, useValue: snackbarServiceSpy },
        { provide: ConfirmDialogService, useValue: dialogServiceSpy },
        { provide: RolesService, useValue: rolesServiceSpy },
        { provide: PuenteDatosService, useValue: puenteDatosServiceSpy },
        MatDialog
      ],
      schemas: [NO_ERRORS_SCHEMA] // Evita errores de esquema por elementos desconocidos
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
