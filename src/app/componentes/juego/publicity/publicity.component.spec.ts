import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule

import { PublicityComponent } from './publicity.component';
import { PublicityService } from 'src/app/servicios/publicity/publicity.service'; // Asegúrate de importar tus servicios si es necesario

describe('PublicityComponent', () => {
  let component: PublicityComponent;
  let fixture: ComponentFixture<PublicityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicityComponent ],
      imports: [
        HttpClientModule // Agrega HttpClientModule
      ],
      providers: [
        PublicityService // Agrega el servicio si es necesario para las pruebas
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
