import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importa BrowserAnimationsModule
import { CreateAwardsComponent } from './create-awards.component';
import { AwardsService } from 'src/app/servicios/awards/awards.service';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
import { SnackbarService } from './../../../../servicios/snackbar/snackbar.service';

describe('CreateAwardsComponent', () => {
  let component: CreateAwardsComponent;
  let fixture: ComponentFixture<CreateAwardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAwardsComponent ],
      imports: [ 
        ReactiveFormsModule, 
        MatInputModule,
        MatDialogModule,
        MatSnackBarModule,
        MatSelectModule,
        MatCheckboxModule,
        HttpClientTestingModule,
        BrowserAnimationsModule // Añade BrowserAnimationsModule aquí
      ],
      providers: [
        AwardsService, 
        SnackbarService,
        ConfirmDialogService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAwardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
