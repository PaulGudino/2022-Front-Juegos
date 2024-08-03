import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { UsuariosComponent } from './user.component';
import { ApiService } from '../../../servicios/user/user.service';
import { PuenteDatosService } from './../../../servicios/comunicacio_componentes/puente-datos.service';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


class MockApiService {
  getUsuarios(filter: string) {
    return of([]); // Devuelve un observable vacío para pruebas
  }

  deleteUsuario(id: number) {
    return of(null); // Devuelve un observable vacío para pruebas
  }
}

class MockConfirmDialogService {
  open(options: any) {
    return of(true); // Devuelve un observable con valor true para pruebas
  }

  confirmed() {
    return of(true); // Devuelve un observable con valor true para pruebas
  }

  error(message: string) {
    // No hace nada en la prueba
  }
}

describe('UsuariosComponent', () => {
  let component: UsuariosComponent;
  let fixture: ComponentFixture<UsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        NoopAnimationsModule // O bien esto si no usas animaciones
      ],
      declarations: [ UsuariosComponent ],
      providers: [
        { provide: ApiService, useClass: MockApiService },
        { provide: ConfirmDialogService, useClass: MockConfirmDialogService },
        { provide: SnackbarService, useValue: { mensaje: () => {} } }, // Mock para SnackbarService
        PuenteDatosService,
        { provide: Router, useValue: { navigate: () => {} } } // Mock para Router
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Agrega más pruebas según sea necesario
});