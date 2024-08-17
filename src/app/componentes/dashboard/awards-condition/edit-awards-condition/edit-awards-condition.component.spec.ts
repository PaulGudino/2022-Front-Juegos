import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditAwardsConditionComponent } from './edit-awards-condition.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AwardsConditionService } from 'src/app/servicios/awards-condition/awards-condition.service';
import { AwardsService } from 'src/app/servicios/awards/awards.service';
import { PuenteDatosService } from 'src/app/servicios/comunicacio_componentes/puente-datos.service';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
import { GameDateService } from 'src/app/servicios/game-date/game-date.service';
import { GameSelectionService } from 'src/app/servicios/game-selection/game-selection.service';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('EditAwardsConditionComponent', () => {
  let component: EditAwardsConditionComponent;
  let fixture: ComponentFixture<EditAwardsConditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAwardsConditionComponent ],
      imports: [
        HttpClientTestingModule,
        MatFormFieldModule,
        MatSelectModule,
        MatCardModule,
        FormsModule,
        ReactiveFormsModule,
        NgbTimepickerModule,
        BrowserAnimationsModule // Asegúrate de incluir BrowserAnimationsModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } },
        { provide: AwardsConditionService, useValue: { getAwardEdit: () => of([]), getAwardConditionbyId: () => of({}), putAwardCondition: () => of({}) } },
        { provide: AwardsService, useValue: { getAwardbyId: () => of({}) } },
        { provide: PuenteDatosService, useValue: { setMenu: () => {} } },
        { provide: ConfirmDialogService, useValue: { open: () => {}, confirmed: () => of(true), error: () => {} } },
        { provide: SnackbarService, useValue: { mensaje: () => {} } },
        { provide: GameDateService, useValue: { DateFormat: (date: any) => date } },
        { provide: GameSelectionService, useValue: { selectedGame$: of(null) } },
        { provide: Router, useValue: { navigate: () => {} } }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAwardsConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
