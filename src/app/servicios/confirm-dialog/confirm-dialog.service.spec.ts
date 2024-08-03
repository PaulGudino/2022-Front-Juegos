import { TestBed } from '@angular/core/testing';
import { ConfirmDialogService } from './confirm-dialog.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { of } from 'rxjs';

const matDialogMock = {
  open: jasmine.createSpy('open').and.returnValue({
    afterClosed: () => of(true) // Mock para afterClosed
  })
};


describe('ConfirmDialogService', () => {
  let service: ConfirmDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule], // Importa MatDialogModule
      providers: [
        ConfirmDialogService,
        { provide: MatDialog, useValue: matDialogMock } // Usa el mock para MatDialog
      ]
    });
    service = TestBed.inject(ConfirmDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});