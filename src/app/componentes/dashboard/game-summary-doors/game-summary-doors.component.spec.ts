import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { GameSummaryDoorsComponent } from './game-summary-doors.component';
import { PuenteDatosService } from 'src/app/servicios/comunicacio_componentes/puente-datos.service';
import { GameSummaryComponent } from '../game-summary/game-summary.component';
import { GameCurrentSessionService } from 'src/app/servicios/gameCurrentSession/game-current-session.service';

describe('GameSummaryDoorsComponent', () => {
  let component: GameSummaryDoorsComponent;
  let fixture: ComponentFixture<GameSummaryDoorsComponent>;

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

    fixture = TestBed.createComponent(GameSummaryDoorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
