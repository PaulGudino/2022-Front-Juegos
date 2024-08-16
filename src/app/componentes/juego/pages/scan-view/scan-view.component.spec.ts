import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { ScanViewComponent } from './scan-view.component';
import { DashboardPublicityService } from 'src/app/servicios/publicity/dashboardPublicity/dashboard-publicity.service';
import { DashboardStyleService } from 'src/app/servicios/theme/dashboardStyle/dashboard-style.service';
import { KeyControllerService } from '../../service/keyController/key-controller.service';
import { GameLogicService } from '../../service/gameLogic/game-logic.service';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
import { TicketService } from 'src/app/servicios/ticket/ticket.service';

const mockRouter = {
  navigate: jasmine.createSpy('navigate')
};

const mockDashboardPublicityService = {
  getTopPublicityList: jasmine.createSpy('getTopPublicityList').and.returnValue(of([])),
  getBottomPublicityList: jasmine.createSpy('getBottomPublicityList').and.returnValue(of([]))
};

const mockDashboardStyleService = {
  get_image_logo_game: jasmine.createSpy('get_image_logo_game').and.returnValue('mock-logo-url'),
  get_scan_code_title: jasmine.createSpy('get_scan_code_title').and.returnValue('mock-title'),
  get_scan_code_description: jasmine.createSpy('get_scan_code_description').and.returnValue('mock-description'),
  get_image_logo: jasmine.createSpy('get_image_logo').and.returnValue('mock-image-logo'),
  get_image_background_kiosco: jasmine.createSpy('get_image_background_kiosco').and.returnValue('mock-background-url'),
  get_image_logo_kiosco: jasmine.createSpy('get_image_logo_kiosco').and.returnValue('mock-logo-kiosco-url')
};

const mockKeyControllerService = {
  getCode: jasmine.createSpy('getCode'),
  setCode: jasmine.createSpy('setCode'),
  clearCode: jasmine.createSpy('clearCode'),
  code: ''
};

const mockGameLogicService = {
  verifyTicket: jasmine.createSpy('verifyTicket'),
  playGame: jasmine.createSpy('playGame')
};

const mockConfirmDialogService = {
  error: jasmine.createSpy('error')
};

const mockTicketService = {};

describe('ScanViewComponent', () => {
  let component: ScanViewComponent;
  let fixture: ComponentFixture<ScanViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ 
        HttpClientTestingModule,
        FormsModule
      ],
      declarations: [ ScanViewComponent ],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: DashboardPublicityService, useValue: mockDashboardPublicityService },
        { provide: DashboardStyleService, useValue: mockDashboardStyleService },
        { provide: KeyControllerService, useValue: mockKeyControllerService },
        { provide: GameLogicService, useValue: mockGameLogicService },
        { provide: ConfirmDialogService, useValue: mockConfirmDialogService },
        { provide: TicketService, useValue: mockTicketService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScanViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create scan view component', () => {
    expect(component).toBeTruthy();
  });

  it('should change view to input code state', () => {
    component.changeView();
    expect(component.scanState).toBeFalse();
    expect(mockKeyControllerService.setCode).toHaveBeenCalledWith("");
  });

  // Test Cases

  it('should continue to game with valid QR code (CE1)', async () => {
    mockKeyControllerService.getCode.and.returnValue('777888'); // Valid QR Code
    mockGameLogicService.verifyTicket.and.returnValue(Promise.resolve(true));
    await component.continueToGame();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/juego/selection']);
    expect(mockGameLogicService.playGame).toHaveBeenCalled();
    expect(sessionStorage.getItem('selection_game')).toBe('selection_game');
  });

  it('should show error for QR code with less than 6 digits (CE2)', async () => {
    mockKeyControllerService.getCode.and.returnValue('46491'); // Invalid QR Code (less than 6 digits)
    mockGameLogicService.verifyTicket.and.returnValue(Promise.resolve(false));

    await component.continueToGame();
    expect(mockConfirmDialogService.error).toHaveBeenCalled();
    expect(mockKeyControllerService.clearCode).toHaveBeenCalled();
  });

  it('should show error for QR code with more than 6 digits (CE3)', async () => {
    mockKeyControllerService.getCode.and.returnValue('1269571'); // Invalid QR Code (more than 6 digits)
    mockGameLogicService.verifyTicket.and.returnValue(Promise.resolve(false));
    await component.continueToGame();
    expect(mockConfirmDialogService.error).toHaveBeenCalled();
    expect(mockKeyControllerService.clearCode).toHaveBeenCalled();
  });

  it('should show error for QR code with non-numeric characters (CE4)', async () => {
    mockKeyControllerService.getCode.and.returnValue('A1B2-C3D4E'); // Invalid QR Code (non-numeric characters)
    mockGameLogicService.verifyTicket.and.returnValue(Promise.resolve(false));
    await component.continueToGame();
    expect(mockConfirmDialogService.error).toHaveBeenCalled();
    expect(mockKeyControllerService.clearCode).toHaveBeenCalled();
  });
});
