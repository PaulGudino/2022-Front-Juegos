import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateAwardsConditionComponent } from './create-awards-condition.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AwardsConditionService } from 'src/app/servicios/awards-condition/awards-condition.service';
import { AwardsService } from 'src/app/servicios/awards/awards.service';
import { PuenteDatosService } from 'src/app/servicios/comunicacio_componentes/puente-datos.service';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
import { GameDateService } from 'src/app/servicios/game-date/game-date.service';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';
import { GameSelectionService } from 'src/app/servicios/game-selection/game-selection.service';
import { NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';

// Mock de los servicios
const mockAwardsConditionService = {
  postAwardCondition: jasmine.createSpy().and.returnValue(of({})),
  getAward: jasmine.createSpy().and.returnValue(of([]))
};

const mockAwardsService = {
  getAwardbyId: jasmine.createSpy().and.returnValue(of({}))
};

const mockPuenteDatosService = {};

const mockConfirmDialogService = {
  open: jasmine.createSpy(),
  confirmed: jasmine.createSpy().and.returnValue(of(true)),
  error: jasmine.createSpy()
};

const mockGameDateService = {
  DateFormat: jasmine.createSpy().and.returnValue('')
};

const mockSnackbarService = {
  mensaje: jasmine.createSpy()
};

const mockGameSelectionService = {
  selectedGame$: of({})
};

describe('CreateAwardsConditionComponent', () => {
  let component: CreateAwardsConditionComponent;
  let fixture: ComponentFixture<CreateAwardsConditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAwardsConditionComponent ],
      imports: [
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        NgbTimepickerModule  // Agregar esto
      ],
      providers: [
        FormBuilder,
        { provide: AwardsConditionService, useValue: mockAwardsConditionService },
        { provide: AwardsService, useValue: mockAwardsService },
        { provide: PuenteDatosService, useValue: mockPuenteDatosService },
        { provide: ConfirmDialogService, useValue: mockConfirmDialogService },
        { provide: GameDateService, useValue: mockGameDateService },
        { provide: SnackbarService, useValue: mockSnackbarService },
        { provide: GameSelectionService, useValue: mockGameSelectionService },
        { provide: Router, useValue: { navigate: jasmine.createSpy() } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAwardsConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
