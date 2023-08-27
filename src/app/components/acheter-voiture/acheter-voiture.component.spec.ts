import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcheterVoitureComponent } from './acheter-voiture.component';

describe('AcheterVoitureComponent', () => {
  let component: AcheterVoitureComponent;
  let fixture: ComponentFixture<AcheterVoitureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcheterVoitureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcheterVoitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
