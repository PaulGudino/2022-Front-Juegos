import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameSummaryComponent } from './game-summary.component';
import { of } from 'rxjs';
import { PuenteDatosService } from 'src/app/servicios/comunicacio_componentes/puente-datos.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GameCurrentSessionService } from 'src/app/servicios/gameCurrentSession/game-current-session.service';

describe('GameSummaryComponent', () => {
  let component: GameSummaryComponent;
  let fixture: ComponentFixture<GameSummaryComponent>;

  let mockPuenteDatosService = {
    setMenu: jasmine.createSpy('setMenu')
  };

  let mockGameCurrentSessionService = {
    getFilter: jasmine.createSpy('getFilter').and.returnValue(of([]))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameSummaryComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [
        { provide: PuenteDatosService, useValue: mockPuenteDatosService },
        { provide: GameCurrentSessionService, useValue: mockGameCurrentSessionService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
