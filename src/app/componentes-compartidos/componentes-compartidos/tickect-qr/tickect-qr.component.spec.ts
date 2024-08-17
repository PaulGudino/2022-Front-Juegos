import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TickectQRComponent } from './tickect-qr.component';
import { GameService } from 'src/app/servicios/game/game.service';
import { TicketConfigurationService } from 'src/app/servicios/ticket-configuration/ticket-configuration.service';
import { of } from 'rxjs';

describe('TickectQRComponent', () => {
  let component: TickectQRComponent;
  let fixture: ComponentFixture<TickectQRComponent>;

  // Mock services
  const mockGameService = {
    getById: jasmine.createSpy('getById').and.returnValue(of({
      start_date: '2024-08-01T00:00:00Z',
      end_date: '2024-08-10T00:00:00Z'
    }))
  };

  const mockTicketConfigurationService = {
    getTicketConfiguration: jasmine.createSpy('getTicketConfiguration').and.returnValue(of({
      logo: 'test-logo.png',
      title: 'Test Title',
      description: 'Test Description'
    }))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TickectQRComponent ],
      providers: [
        { provide: GameService, useValue: mockGameService },
        { provide: TicketConfigurationService, useValue: mockTicketConfigurationService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TickectQRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
