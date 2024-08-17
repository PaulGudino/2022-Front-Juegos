import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs'; // Importa 'of' y 'throwError' para crear observables simulados
import { Router } from '@angular/router';

import { InicioComponent } from './inicio.component';
import { ApiService } from '../../../servicios/user/user.service';
import { PuenteDatosService } from 'src/app/servicios/comunicacio_componentes/puente-datos.service';

describe('InicioComponent', () => {
  let component: InicioComponent;
  let fixture: ComponentFixture<InicioComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let puenteDatosServiceSpy: jasmine.SpyObj<PuenteDatosService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Crea espías (mocks) para los servicios
    apiServiceSpy = jasmine.createSpyObj('ApiService', ['getUsuarioId']);
    puenteDatosServiceSpy = jasmine.createSpyObj('PuenteDatosService', ['setMenuGeneral']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    // Simula el método 'getUsuarioId' para devolver un observable con datos de usuario simulados
    apiServiceSpy.getUsuarioId.and.returnValue(of({
      id: 1,
      cedula: '123456789',
      names: 'John',
      surnames: 'Doe',
      username: 'johndoe',
      email: 'john.doe@example.com',
      phone: '1234567890',
      password: 'password123',
      sex: 'M',
      address: '123 Main St',
      rol: 'User',
      is_active: true,
      created: '2023-01-01',
      modified: '2023-01-01',
      last_session: '2023-01-01'
    }));

    await TestBed.configureTestingModule({
      declarations: [ InicioComponent ],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy },
        { provide: PuenteDatosService, useValue: puenteDatosServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
