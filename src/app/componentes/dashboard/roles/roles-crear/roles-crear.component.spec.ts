import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Agrega esto

import { RolesCrearComponent } from './roles-crear.component';
import { SnackbarService } from './../../../../servicios/snackbar/snackbar.service';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
import { RolesService } from 'src/app/servicios/roles/roles.service';
import { PuenteDatosService } from 'src/app/servicios/comunicacio_componentes/puente-datos.service';

describe('RolesCrearComponent', () => {
  let component: RolesCrearComponent;
  let fixture: ComponentFixture<RolesCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolesCrearComponent ],
      imports: [ 
        ReactiveFormsModule, 
        MatFormFieldModule, 
        MatInputModule,
        MatSelectModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatSnackBarModule,
        MatDialogModule,
        HttpClientTestingModule,
        BrowserAnimationsModule // Agrega esto
      ],
      providers: [
        SnackbarService,
        ConfirmDialogService,
        RolesService,
        PuenteDatosService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolesCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
