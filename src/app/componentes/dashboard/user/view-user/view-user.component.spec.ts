import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VisualizarUsuariosComponent } from './view-user.component';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importa HttpClientTestingModule
import { ApiService } from '../../../../servicios/user/user.service';
import { ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule
import { RouterTestingModule } from '@angular/router/testing';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';
import { MatSnackBarModule } from '@angular/material/snack-bar'; // Importa MatSnackBarModule
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';


describe('VisualizarUsuariosComponent', () => {
  let component: VisualizarUsuariosComponent;
  let fixture: ComponentFixture<VisualizarUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, 
      ReactiveFormsModule,
      RouterTestingModule,
      MatSnackBarModule,
      MatDialogModule,
      MatAutocompleteModule,
      MatSelectModule,
      MatFormFieldModule,
      MatInputModule,
      ReactiveFormsModule],
      declarations: [ VisualizarUsuariosComponent ],
      providers: [ ApiService,SnackbarService,ConfirmDialogService] // Incluye cualquier servicio que requiera HttpClient
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizarUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
