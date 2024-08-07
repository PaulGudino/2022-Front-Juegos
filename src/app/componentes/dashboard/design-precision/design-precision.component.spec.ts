import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { DesignPrecisionComponent } from './design-precision.component';
import { DashboardPublicityService } from '../../../servicios/publicity/dashboardPublicity/dashboard-publicity.service';
import { PublicityService } from 'src/app/servicios/publicity/publicity.service';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
import { ThemeService } from 'src/app/servicios/theme/theme.service';
import { ImageService } from 'src/app/servicios/image/image.service';
import { DashboardStyleService } from 'src/app/servicios/theme/dashboardStyle/dashboard-style.service';
import { PuenteDatosService } from 'src/app/servicios/comunicacio_componentes/puente-datos.service';
import { PublicityGameService } from 'src/app/servicios/publicityGame/publicity-game.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DesignPrecisionComponent', () => {
  let component: DesignPrecisionComponent;
  let fixture: ComponentFixture<DesignPrecisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatDialogModule,
        BrowserAnimationsModule
      ],
      declarations: [ DesignPrecisionComponent ],
      providers: [
        DashboardPublicityService,
        PublicityService,
        SnackbarService,
        ConfirmDialogService,
        ThemeService,
        ImageService,
        DashboardStyleService,
        PuenteDatosService,
        PublicityGameService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesignPrecisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
