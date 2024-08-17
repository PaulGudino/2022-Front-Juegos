import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';  // Importa MatSnackBarModule
import { PermissionsGuard } from './permissions.guard';
import { PermisosService } from 'src/app/servicios/permisos/permisos.service';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';

describe('PermissionsGuard', () => {
  let guard: PermissionsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatSnackBarModule  // Proporciona MatSnackBarModule para MatSnackBar
      ],
      providers: [
        PermissionsGuard,
        PermisosService,
        SnackbarService
      ]
    });
    guard = TestBed.inject(PermissionsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
