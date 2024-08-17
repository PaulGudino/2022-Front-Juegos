import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InicioGuard } from './inicio.guard';
import { ApiService } from 'src/app/servicios/user/user.service';

describe('InicioGuard', () => {
  let guard: InicioGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,  // Importa RouterTestingModule para simular el enrutamiento
        HttpClientTestingModule  // Importa HttpClientTestingModule para proporcionar HttpClient
      ],
      providers: [
        InicioGuard,
        ApiService  // Proporciona ApiService para inyectar en el guardia
      ]
    });
    guard = TestBed.inject(InicioGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
