import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';
import { LoginComponent } from './login.component';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { MensajesErrorComponent } from '../dashboard/mensajes-error/mensajes-error.component';

// Mock de servicios
class MockAuthService {
  Login() {
    return of({ token: 'fake-token', user: { id: '1234' }, rol: 'user', refresh: 'fake-refresh-token' });
  }
}

class MockMatDialog {
  open() {
    return {
      afterClosed: () => of(true)
    };
  }
}

class MockMatSnackBar {
  open() {}
}

class MockRouter {
  navigate() {}
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent, MensajesErrorComponent ],
      imports: [
        ReactiveFormsModule, // Importa ReactiveFormsModule para formularios reactivos
        // Agrega otros módulos si es necesario, como BrowserAnimationsModule para Angular Material
      ],
      providers: [
        FormBuilder, // Proporciona FormBuilder
        { provide: AuthService, useClass: MockAuthService }, // Proporciona un mock de AuthService
        { provide: MatSnackBar, useClass: MockMatSnackBar }, // Proporciona un mock de MatSnackBar
        { provide: Router, useClass: MockRouter }, // Proporciona un mock de Router
        { provide: MatDialog, useClass: MockMatDialog } // Proporciona un mock de MatDialog
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
