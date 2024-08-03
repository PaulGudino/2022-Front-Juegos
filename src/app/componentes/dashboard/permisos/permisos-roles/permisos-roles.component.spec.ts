import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PermisosRolesComponent } from './permisos-roles.component';
import { PermisosService } from 'src/app/servicios/permisos/permisos.service';
import { RolesService } from 'src/app/servicios/roles/roles.service';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
import { PuenteDatosService } from 'src/app/servicios/comunicacio_componentes/puente-datos.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

// Mocks para los servicios
const permisoSrvMock = {
  getPermisos: () => of([]),
  getPermisosbyRol: () => of([]),
  deletePermissionRol: () => of({}),
  postPermisosbyRol: () => of({})
};

const rolesServiceMock = {
  getRolbyId: () => of({ name: 'Rol' })
};

const snackbarServiceMock = {
  mensaje: (msg: string) => {}
};

const confirmDialogServiceMock = {
  open: (options: any) => {},
  confirmed: () => of(true)
};

const puenteDatosServiceMock = {
  setMenuGeneral: () => {}
};

const activatedRouteMock = {
  snapshot: {
    paramMap: {
      get: (key: string) => '1'
    }
  }
};

describe('PermisosRolesComponent', () => {
  let component: PermisosRolesComponent;
  let fixture: ComponentFixture<PermisosRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [PermisosRolesComponent],
      providers: [
        FormBuilder,
        { provide: PermisosService, useValue: permisoSrvMock },
        { provide: RolesService, useValue: rolesServiceMock },
        { provide: SnackbarService, useValue: snackbarServiceMock },
        { provide: ConfirmDialogService, useValue: confirmDialogServiceMock },
        { provide: PuenteDatosService, useValue: puenteDatosServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: Router, useValue: { navigate: () => {} } }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermisosRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
