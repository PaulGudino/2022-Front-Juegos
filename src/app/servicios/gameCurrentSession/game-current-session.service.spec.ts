import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';  // Importa el módulo para pruebas de HttpClient

import { GameCurrentSessionService } from './game-current-session.service';

describe('GameCurrentSessionService', () => {
  let service: GameCurrentSessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],  // Importa HttpClientTestingModule para servicios que usan HttpClient
      providers: [GameCurrentSessionService]  // Asegúrate de que el servicio esté en los proveedores
    });
    service = TestBed.inject(GameCurrentSessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
