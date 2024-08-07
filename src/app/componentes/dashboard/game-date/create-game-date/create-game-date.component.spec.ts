import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms'; // Importa ReactiveFormsModule y FormsModule
import { CreateGameDateComponent } from './create-game-date.component';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
import { GameService } from 'src/app/servicios/game/game.service';
import { MatFormFieldModule } from '@angular/material/form-field';  // Importa los módulos necesarios de Angular Material
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap'; // Importa el módulo de NgbTimepicker
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importa para animaciones

// Mock de los servicios
class MockSnackbarService {}
class MockConfirmDialogService {}
class MockGameService {}

describe('CreateGameDateComponent', () => {
  let component: CreateGameDateComponent;
  let fixture: ComponentFixture<CreateGameDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateGameDateComponent ],
      imports: [
        ReactiveFormsModule, // Importa ReactiveFormsModule
        FormsModule, // Importa FormsModule
        MatFormFieldModule, // Importa los módulos necesarios de Angular Material
        MatInputModule,
        MatCardModule,
        MatToolbarModule,
        MatIconModule,
        NgbTimepickerModule, // Importa el módulo de NgbTimepicker
        BrowserAnimationsModule // Importa para animaciones de Angular Material
      ],
      providers: [
        FormBuilder,
        { provide: SnackbarService, useClass: MockSnackbarService },
        { provide: ConfirmDialogService, useClass: MockConfirmDialogService },
        { provide: GameService, useClass: MockGameService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateGameDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
