import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TicketConfigurationService } from './ticket-configuration.service';

describe('TicketConfigurationService', () => {
  let service: TicketConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TicketConfigurationService]
    });
    service = TestBed.inject(TicketConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
