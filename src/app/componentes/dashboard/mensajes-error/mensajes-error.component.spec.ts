import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MensajesErrorComponent } from './mensajes-error.component';

describe('MensajesErrorComponent', () => {
  let component: MensajesErrorComponent;
  let fixture: ComponentFixture<MensajesErrorComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<MensajesErrorComponent>>;

  beforeEach(async () => {
    // Crear un espía para MatDialogRef
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      declarations: [ MensajesErrorComponent ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: [] }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MensajesErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
