import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearUsuariosComponent } from './create-user.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiService } from '../../../../servicios/user/user.service';
import { SnackbarService } from '../../../../servicios/snackbar/snackbar.service';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
import { PuenteDatosService } from './../../../../servicios/comunicacio_componentes/puente-datos.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { of, throwError } from 'rxjs';
import { Roles } from 'src/app/interfaces/roles/roles';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('CrearUsuariosComponent', () => {
  let component: CrearUsuariosComponent;
  let fixture: ComponentFixture<CrearUsuariosComponent>;
  let apiService: ApiService;
  let snackBarService: SnackbarService;
  let dialogService: ConfirmDialogService;
  let puenteDatosService: PuenteDatosService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        MatSnackBarModule,
        MatDialogModule,
        MatAutocompleteModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule 
      ],
      declarations: [ CrearUsuariosComponent ],
      providers: [
        ApiService,
        SnackbarService,
        ConfirmDialogService,
        PuenteDatosService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearUsuariosComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    snackBarService = TestBed.inject(SnackbarService);
    dialogService = TestBed.inject(ConfirmDialogService);
    puenteDatosService = TestBed.inject(PuenteDatosService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
