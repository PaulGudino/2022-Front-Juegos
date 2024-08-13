import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

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
  get_image_logo: jasmine.createSpy('get_image_logo').and.returnValue('mock-image-logo') // Agregado aquí
};

const mockKeyControllerService = {
  getCode: jasmine.createSpy('getCode').and.returnValue('mock-code'),
  setCode: jasmine.createSpy('setCode'),
  clearCode: jasmine.createSpy('clearCode'),
  code: 'mock-code'
};

const mockGameLogicService = {
  verifyTicket: jasmine.createSpy('verifyTicket').and.returnValue(Promise.resolve(true)),
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Puedes agregar más pruebas específicas aquí si es necesario
});
