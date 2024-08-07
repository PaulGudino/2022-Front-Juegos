import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResultMessageComponent } from './result-message.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { GameLogicService } from '../service/gameLogic/game-logic.service';

describe('ResultMessageComponent', () => {
  let component: ResultMessageComponent;
  let fixture: ComponentFixture<ResultMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultMessageComponent ],
      imports: [
        MatDialogModule,
        RouterTestingModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: { close: () => {} } },
        { provide: MAT_DIALOG_DATA, useValue: { title: '', image: '', result_music: '' } },
        {
          provide: GameLogicService, useValue: {
            attempts: 0,
            winFirstTime: false
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
