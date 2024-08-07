import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';

import { RolesEditarComponent } from './roles-editar.component';
import { RolesService } from './../../../../servicios/roles/roles.service';
import { SnackbarService } from './../../../../servicios/snackbar/snackbar.service';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
import { PuenteDatosService } from 'src/app/servicios/comunicacio_componentes/puente-datos.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('RolesEditarComponent', () => {
  let component: RolesEditarComponent;
  let fixture: ComponentFixture<RolesEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatToolbarModule
      ],
      declarations: [RolesEditarComponent],
      providers: [
        FormBuilder,
        { 
          provide: Router, 
          useValue: { navigate: jasmine.createSpy('navigate') } // Mock Router
        },
        { 
          provide: ActivatedRoute, 
          useValue: { 
            snapshot: { paramMap: { get: () => '1' } } // Mock ActivatedRoute
          }
        },
        { 
          provide: RolesService, 
          useValue: { 
            getRolbyId: () => of({
              id: 1,
              name: 'Admin',
              description: 'Administrator role',
              is_active: true
            }),
            putRol: () => of({}) // Mock method
          }
        },
        { 
          provide: SnackbarService, 
          useValue: { mensaje: jasmine.createSpy('mensaje') } // Mock method
        },
        { 
          provide: ConfirmDialogService, 
          useValue: { 
            open: jasmine.createSpy('open'),
            confirmed: () => of(true),
            error: jasmine.createSpy('error') 
          }
        },
        { 
          provide: PuenteDatosService, 
          useValue: { setMenuGeneral: jasmine.createSpy('setMenuGeneral') } // Mock method
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolesEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
