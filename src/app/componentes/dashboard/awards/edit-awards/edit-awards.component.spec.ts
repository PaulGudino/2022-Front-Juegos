import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importa BrowserAnimationsModule

import { EditAwardsComponent } from './edit-awards.component';
import { AwardsService } from 'src/app/servicios/awards/awards.service';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';
import { ImageService } from 'src/app/servicios/image/image.service';
import { PuenteDatosService } from 'src/app/servicios/comunicacio_componentes/puente-datos.service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

class MockAwardsService {
  getAwardbyId() {
    return of({
      name: 'Test Award',
      description: 'Test Description',
      initial_stock: 10,
      is_active: true,
      category: 'Legendaria',
      game: '1',
      imagen: 'assets/img/test.png'
    });
  }
  putAward() {
    return of({});
  }
}

class MockConfirmDialogService {
  open() {}
  confirmed() {
    return of(true);
  }
}

class MockSnackbarService {
  mensaje() {}
}

class MockImageService {
  captureFile() { return null; }
  extraerBase64() { return Promise.resolve({ base: 'assets/img/test.png' }); }
}

class MockPuenteDatosService {
  setMenuGeneral() {}
}

describe('EditAwardsComponent', () => {
  let component: EditAwardsComponent;
  let fixture: ComponentFixture<EditAwardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAwardsComponent ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        MatDialogModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatToolbarModule,
        MatCardModule,
        MatButtonModule,
        BrowserAnimationsModule // Añadido BrowserAnimationsModule
      ],
      providers: [
        { provide: AwardsService, useClass: MockAwardsService },
        { provide: ConfirmDialogService, useClass: MockConfirmDialogService },
        { provide: SnackbarService, useClass: MockSnackbarService },
        { provide: ImageService, useClass: MockImageService },
        { provide: PuenteDatosService, useClass: MockPuenteDatosService },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: new Map([['id', '1']]) } } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAwardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
