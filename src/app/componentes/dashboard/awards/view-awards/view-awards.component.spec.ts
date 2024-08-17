import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { ViewAwardsComponent } from './view-awards.component';
import { AwardsService } from 'src/app/servicios/awards/awards.service';
import { PuenteDatosService } from 'src/app/servicios/comunicacio_componentes/puente-datos.service';
import { ActivatedRoute } from '@angular/router';

class MockAwardsService {
  getAwardbyIdVisualizer(id: number) {
    return of({
      name: 'Test Award',
      description: 'Test Description',
      initial_stock: 10,
      condition_stock: 5,
      prizes_awarded: 3,
      total_awards: 20,
      created: '2024-01-01',
      modified: '2024-01-02',
      user_register: 'User1',
      user_modify: 'User2',
      category: 'Legendaria',
      game: 'Game1',
      imagen: 'assets/img/test.png',
      is_active: true
    });
  }
}

class MockPuenteDatosService {
  setMenuGeneral() {}
}

class MockActivatedRoute {
  snapshot = { paramMap: new Map([['id', '1']]) };
}

describe('ViewAwardsComponent', () => {
  let component: ViewAwardsComponent;
  let fixture: ComponentFixture<ViewAwardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAwardsComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: AwardsService, useClass: MockAwardsService },
        { provide: PuenteDatosService, useClass: MockPuenteDatosService },
        { provide: ActivatedRoute, useClass: MockActivatedRoute }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAwardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
