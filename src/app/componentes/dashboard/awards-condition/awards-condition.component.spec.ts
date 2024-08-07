import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AwardsConditionComponent } from './awards-condition.component';
import { MatDialogModule } from '@angular/material/dialog'; // Importa MatDialogModule para pruebas
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';

describe('AwardsConditionComponent', () => {
  let component: AwardsConditionComponent;
  let fixture: ComponentFixture<AwardsConditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AwardsConditionComponent],
      imports: [
        HttpClientTestingModule,
        MatDialogModule, // Importa MatDialogModule aquí
        MatSnackBarModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      providers: [
        SnackbarService,
        ConfirmDialogService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AwardsConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create 2', () => {
    expect(component).toBeTruthy();
  });
});
