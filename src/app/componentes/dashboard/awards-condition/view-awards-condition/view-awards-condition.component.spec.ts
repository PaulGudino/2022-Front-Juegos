import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';  // Importa HttpClientTestingModule
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ViewAwardsConditionComponent } from './view-awards-condition.component';  // Asegúrate de que la ruta es correcta
import { AwardsConditionService } from 'src/app/servicios/awards-condition/awards-condition.service';
import { AwardsService } from 'src/app/servicios/awards/awards.service';
import { PuenteDatosService } from 'src/app/servicios/comunicacio_componentes/puente-datos.service';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
import { GameSelectionService } from 'src/app/servicios/game-selection/game-selection.service';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

// Mock Services
class MockAwardsConditionService {
  getAwardConditionbyId() {
    return of({ award: 1 });
  }
}

class MockAwardsService {
  getAwardbyId() {
    return of({ imagen: 'test-image', name: 'test-award' });
  }
}

class MockPuenteDatosService {
  setMenu() {}
}

class MockConfirmDialogService {
  error() {}
}

class MockGameSelectionService {
  selectedGame$ = of({});
}

class MockSnackbarService {}

class MockRouter {
  navigate() {}
}

class MockActivatedRoute {
  snapshot = { paramMap: new Map().set('id', '1') };
}

describe('ViewAwardsConditionComponent', () => {
  let component: ViewAwardsConditionComponent;
  let fixture: ComponentFixture<ViewAwardsConditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAwardsConditionComponent ],  // Corregido el nombre del componente
      imports: [
        NoopAnimationsModule,
        HttpClientTestingModule,
        MatDialogModule,
        MatSnackBarModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: AwardsConditionService, useClass: MockAwardsConditionService },
        { provide: AwardsService, useClass: MockAwardsService },
        { provide: PuenteDatosService, useClass: MockPuenteDatosService },
        { provide: ConfirmDialogService, useClass: MockConfirmDialogService },
        { provide: GameSelectionService, useClass: MockGameSelectionService },
        { provide: SnackbarService, useClass: MockSnackbarService },
        { provide: Router, useClass: MockRouter },
        { provide: ActivatedRoute, useClass: MockActivatedRoute }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAwardsConditionComponent);  // Corregido el nombre del componente
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create view awards', () => {
    expect(component).toBeTruthy();
  });
});
