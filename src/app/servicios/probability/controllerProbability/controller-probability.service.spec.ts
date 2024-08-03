import { TestBed } from '@angular/core/testing';
import { ControllerProbabilityService } from './controller-probability.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProbabilityService } from 'src/app/servicios/probability/probability/probability.service';
import { AwardsService } from '../../awards/awards.service';
import { of } from 'rxjs';
import { getAwardList } from 'src/app/interfaces/awards/getAwardList';

describe('ControllerProbabilityService', () => {
  let service: ControllerProbabilityService;
  let httpMock: HttpTestingController;
  let probabilityService: jasmine.SpyObj<ProbabilityService>;
  let awardsService: jasmine.SpyObj<AwardsService>;

  beforeEach(() => {
    const probabilitySpy = jasmine.createSpyObj('ProbabilityService', ['postItemToCategory', 'getAwardsListGame']);
    const awardsSpy = jasmine.createSpyObj('AwardsService', ['getAward']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ControllerProbabilityService,
        { provide: ProbabilityService, useValue: probabilitySpy },
        { provide: AwardsService, useValue: awardsSpy }
      ]
    });

    service = TestBed.inject(ControllerProbabilityService);
    httpMock = TestBed.inject(HttpTestingController);
    probabilityService = TestBed.inject(ProbabilityService) as jasmine.SpyObj<ProbabilityService>;
    awardsService = TestBed.inject(AwardsService) as jasmine.SpyObj<AwardsService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});