import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScanCodeComponent } from './scan-code.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar'; // Importa MatSnackBarModule
import { MatDialogModule } from '@angular/material/dialog'; // Importa MatDialogModule
import { FormsModule } from '@angular/forms'; // Importa FormsModule

describe('ScanCodeComponent', () => {
  let component: ScanCodeComponent;
  let fixture: ComponentFixture<ScanCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScanCodeComponent ],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        MatDialogModule,
        FormsModule // Añade FormsModule aquí
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScanCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
