import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVoitureComponent } from './create-voiture.component';

describe('CreateVoitureComponent', () => {
  let component: CreateVoitureComponent;
  let fixture: ComponentFixture<CreateVoitureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateVoitureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateVoitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
