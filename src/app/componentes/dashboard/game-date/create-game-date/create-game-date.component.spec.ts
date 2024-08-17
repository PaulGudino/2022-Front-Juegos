import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms'; 
import { CreateGameDateComponent } from './create-game-date.component';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
import { GameService } from 'src/app/servicios/game/game.service';
import { MatFormFieldModule } from '@angular/material/form-field';  
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap'; 
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CreateGameDateComponent', () => {
  let component: CreateGameDateComponent;
  let fixture: ComponentFixture<CreateGameDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateGameDateComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatToolbarModule,
        MatIconModule,
        NgbTimepickerModule,
        BrowserAnimationsModule
      ],
      providers: [
        FormBuilder,
        { provide: SnackbarService, useClass: class {} },
        { provide: ConfirmDialogService, useClass: class {} },
        { provide: GameService, useClass: class {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateGameDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('changetime', () => {
    it('should calculate startDate and endDate correctly when times are within the same day', async () => {
      component.beginDate = new Date(2023, 7, 16); // 16 de agosto de 2023
      component.finishDate = new Date(2023, 7, 16); // 16 de agosto de 2023

      component.form.patchValue({
        startTime: { hour: 10, minute: 30 }, // 10:30 AM
        endTime: { hour: 15, minute: 45 }    // 3:45 PM
      });

      await component.changetime();

      expect(component.startDate).toEqual(new Date(2023, 7, 16, 10, 30)); // 16 de agosto de 2023, 10:30 AM
      expect(component.endDate).toEqual(new Date(2023, 7, 16, 15, 45));   // 16 de agosto de 2023, 3:45 PM
    });

    it('should calculate startDate and endDate correctly when start and end times are on different days', async () => {
      component.beginDate = new Date(2023, 7, 16); // 16 de agosto de 2023
      component.finishDate = new Date(2023, 7, 17); // 17 de agosto de 2023

      component.form.patchValue({
        startTime: { hour: 22, minute: 15 }, // 10:15 PM
        endTime: { hour: 1, minute: 30 }     // 1:30 AM (next day)
      });

      await component.changetime();

      expect(component.startDate).toEqual(new Date(2023, 7, 16, 22, 15)); // 16 de agosto de 2023, 10:15 PM
      expect(component.endDate).toEqual(new Date(2023, 7, 17, 1, 30));    // 17 de agosto de 2023, 1:30 AM
    });

    it('should calculate startDate and endDate correctly when end time is earlier on the same day', async () => {
      component.beginDate = new Date(2023, 7, 16); // 16 de agosto de 2023
      component.finishDate = new Date(2023, 7, 16); // 16 de agosto de 2023

      component.form.patchValue({
        startTime: { hour: 14, minute: 0 }, // 2:00 PM
        endTime: { hour: 11, minute: 30 }   // 11:30 AM (earlier in the same day)
      });

      await component.changetime();
      expect(component.startDate).toEqual(new Date(2023, 7, 16, 14, 0)); // 16 de agosto de 2023, 2:00 PM
      expect(component.endDate).toEqual(new Date(2023, 7, 16, 11, 30));  // 16 de agosto de 2023, 11:30 AM
    });
  });
});
