import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { MenuComponent } from './menu.component';
import { ApiService } from '../../../servicios/user/user.service';
import { PuenteDatosService } from 'src/app/servicios/comunicacio_componentes/puente-datos.service';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { Menu } from '../../../interfaces/menu';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let mockApiService: jasmine.SpyObj<ApiService>;
  let mockPuenteDatosService: jasmine.SpyObj<PuenteDatosService>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Configura los servicios simulados
    mockApiService = jasmine.createSpyObj('ApiService', ['someMethod']); // Ajusta según los métodos necesarios
    mockPuenteDatosService = jasmine.createSpyObj('PuenteDatosService', ['getMenu']);
    mockAuthService = jasmine.createSpyObj('AuthService', ['Logout']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    // Devuelve un observable vacío para getMenu
    const mockMenu: Menu[] = [
      { nombre: 'Home', ruta: '/home', icono: 'home' },
      { nombre: 'Profile', ruta: '/profile', icono: 'person' }
    ];
    mockPuenteDatosService.getMenu.and.returnValue(of(mockMenu));

    // Configura la prueba del módulo
    await TestBed.configureTestingModule({
      declarations: [ MenuComponent ],
      providers: [
        { provide: ApiService, useValue: mockApiService },
        { provide: PuenteDatosService, useValue: mockPuenteDatosService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    })
    .compileComponents();

    // Crea la instancia del componente y la fixture
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
