import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PublicityGameService } from './publicity-game.service';
import { PublicityGame } from '../../interfaces/publicityGame/PublicityGame';

describe('PublicityGameService', () => {
  let service: PublicityGameService;
  let httpMock: HttpTestingController;
  const baseUrl = 'http://localhost:3000/'; // Ajusta la URL base si es necesario

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PublicityGameService]
    });

    service = TestBed.inject(PublicityGameService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
