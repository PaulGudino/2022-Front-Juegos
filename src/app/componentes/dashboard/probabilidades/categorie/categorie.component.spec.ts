import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importa HttpClientTestingModule
import { CategorieComponent } from './categorie.component';
import { ProbabilityService } from 'src/app/servicios/probability/probability/probability.service';
import { ControllerProbabilityService } from '../../../../servicios/probability/controllerProbability/controller-probability.service';
import { PublicityService } from 'src/app/servicios/publicity/publicity.service';

describe('CategorieComponent', () => {
  let component: CategorieComponent;
  let fixture: ComponentFixture<CategorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategorieComponent ],
      imports: [ HttpClientTestingModule ], // Agrega HttpClientTestingModule
      providers: [
        ProbabilityService,
        ControllerProbabilityService,
        PublicityService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
