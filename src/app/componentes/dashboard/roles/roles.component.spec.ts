import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { RolesComponent } from './roles.component';
import { ApiService } from 'src/app/servicios/user/user.service';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
import { RolesService } from 'src/app/servicios/roles/roles.service';
import { PuenteDatosService } from 'src/app/servicios/comunicacio_componentes/puente-datos.service';
import { Roles } from 'src/app/interfaces/roles/roles';

describe('RolesComponent', () => {
  let component: RolesComponent;
  let fixture: ComponentFixture<RolesComponent>;
  let mockApiService: jasmine.SpyObj<ApiService>;
  let mockSnackbarService: jasmine.SpyObj<SnackbarService>;
  let mockDialogService: jasmine.SpyObj<ConfirmDialogService>;
  let mockRolesService: jasmine.SpyObj<RolesService>;
  let mockPuenteDatosService: jasmine.SpyObj<PuenteDatosService>;
  let matDialog: MatDialog;

  beforeEach(async () => {
    const apiServiceSpy = jasmine.createSpyObj('ApiService', ['getRolesFilter']);
    const snackbarServiceSpy = jasmine.createSpyObj('SnackbarService', ['mensaje']);
    const dialogServiceSpy = jasmine.createSpyObj('ConfirmDialogService', ['open', 'confirmed']);
    const rolesServiceSpy = jasmine.createSpyObj('RolesService', ['deleteRol']);
    const puenteDatosServiceSpy = jasmine.createSpyObj('PuenteDatosService', ['setMenuGeneral', 'geturl']);

    await TestBed.configureTestingModule({
      declarations: [ RolesComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [
        MatDialog, // Agregado para que MatDialog esté disponible
        { provide: ApiService, useValue: apiServiceSpy },
        { provide: SnackbarService, useValue: snackbarServiceSpy },
        { provide: ConfirmDialogService, useValue: dialogServiceSpy },
        { provide: RolesService, useValue: rolesServiceSpy },
        { provide: PuenteDatosService, useValue: puenteDatosServiceSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA] // Evita errores de esquema por elementos desconocidos
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolesComponent);
    component = fixture.componentInstance;
    matDialog = TestBed.inject(MatDialog); // Inicializa MatDialog
    mockApiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    mockSnackbarService = TestBed.inject(SnackbarService) as jasmine.SpyObj<SnackbarService>;
    mockDialogService = TestBed.inject(ConfirmDialogService) as jasmine.SpyObj<ConfirmDialogService>;
    mockRolesService = TestBed.inject(RolesService) as jasmine.SpyObj<RolesService>;
    mockPuenteDatosService = TestBed.inject(PuenteDatosService) as jasmine.SpyObj<PuenteDatosService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});