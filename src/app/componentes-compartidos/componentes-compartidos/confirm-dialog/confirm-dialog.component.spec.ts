import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

// Mock de datos para MAT_DIALOG_DATA
const mockDialogData = {
  title: 'Test Title',
  message: 'Test Message',
  cancelText: 'Cancel',
  confirmText: 'Confirm'
};

// Mock de MatDialogRef
class MatDialogRefMock {
  afterClosed() {
    return of(true);  // Devuelve un Observable que simula el cierre del diálogo
  }
}

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDialogComponent ],
      imports: [
        MatDialogModule,       // Importa MatDialogModule para el contexto del diálogo
        NoopAnimationsModule   // Importa NoopAnimationsModule para evitar animaciones en pruebas
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },  // Proporciona el mock de MAT_DIALOG_DATA
        { provide: MatDialogRef, useClass: MatDialogRefMock }     // Proporciona el mock de MatDialogRef
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});