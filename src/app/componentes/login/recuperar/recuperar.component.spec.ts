import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from './../../../servicios/snackbar/snackbar.service';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { MensajesErrorComponent } from '../../dashboard/mensajes-error/mensajes-error.component';
import { RecuperarComponent } from './recuperar.component';

describe('RecuperarComponent', () => {
  let component: RecuperarComponent;
  let fixture: ComponentFixture<RecuperarComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockSnackBarService: jasmine.SpyObj<SnackbarService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockMatDialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['OlvideContraseña']);
    mockSnackBarService = jasmine.createSpyObj('SnackbarService', ['mensaje']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockMatDialog = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [RecuperarComponent],
      providers: [
        FormBuilder,
        { provide: AuthService, useValue: mockAuthService },
        { provide: SnackbarService, useValue: mockSnackBarService },
        { provide: Router, useValue: mockRouter },
        { provide: MatDialog, useValue: mockMatDialog },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuperarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
