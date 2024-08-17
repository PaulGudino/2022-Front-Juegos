import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs'; // Importa 'of' para crear observables simulados

import { GameSummaryRolldiceComponent } from './game-summary-rolldice.component';
import { PuenteDatosService } from 'src/app/servicios/comunicacio_componentes/puente-datos.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GameCurrentSessionService } from 'src/app/servicios/gameCurrentSession/game-current-session.service';

describe('GameSummaryRolldiceComponent', () => {
  let component: GameSummaryRolldiceComponent;
  let fixture: ComponentFixture<GameSummaryRolldiceComponent>;

  let mockPuenteDatosService = {
    setMenu: jasmine.createSpy('setMenu')
  };

  let mockGameCurrentSessionService = {
    getFilter: jasmine.createSpy('getFilter').and.returnValue(of([]))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameSummaryRolldiceComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [
        { provide: PuenteDatosService, useValue: mockPuenteDatosService },
        { provide: GameCurrentSessionService, useValue: mockGameCurrentSessionService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameSummaryRolldiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
