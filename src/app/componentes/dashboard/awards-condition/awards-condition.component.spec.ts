import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AwardsConditionComponent } from './awards-condition.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AwardsConditionService } from 'src/app/servicios/awards-condition/awards-condition.service';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
import { PermisosService } from 'src/app/servicios/permisos/permisos.service';
import { PuenteDatosService } from 'src/app/servicios/comunicacio_componentes/puente-datos.service';
import { GameDateService } from 'src/app/servicios/game-date/game-date.service';
import { GameSelectionService } from 'src/app/servicios/game-selection/game-selection.service';
import { OverlayModule } from '@angular/cdk/overlay'; // Importa OverlayModule
import { PortalModule } from '@angular/cdk/portal'; // Importa PortalModule

describe('AwardsConditionComponent', () => {
  let component: AwardsConditionComponent;
  let fixture: ComponentFixture<AwardsConditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AwardsConditionComponent],
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        MatPaginatorModule,
        MatSortModule,
        FormsModule,
        OverlayModule,
        PortalModule, 
        ReactiveFormsModule
      ],
      providers: [
        MatDialog,
        { provide: Router, useValue: { navigate: () => {} } },
        { provide: AwardsConditionService, useValue: { getAwardConditionFilter: () => of([]), getAwardConditionbyId: () => of({ is_approved: false }), deleteAwardCondition: () => of({}) } },
        { provide: SnackbarService, useValue: { mensaje: () => {} } },
        { provide: ConfirmDialogService, useValue: { open: () => {}, confirmed: () => of(true), error: () => {} } },
        { provide: PermisosService, useValue: { getPermisosbyName: () => of([{ id: 1 }]), getPermisosbyRolandPermission: () => of([]) } },
        { provide: PuenteDatosService, useValue: { setMenu: () => {} } },
        { provide: GameDateService, useValue: { DateFormat: (date: any) => date } },
        { provide: GameSelectionService, useValue: { selectedGame$: of(null) } }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AwardsConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
