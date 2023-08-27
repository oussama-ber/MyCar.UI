import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendreVoitureComponent } from './vendre-voiture.component';

describe('VendreVoitureComponent', () => {
  let component: VendreVoitureComponent;
  let fixture: ComponentFixture<VendreVoitureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendreVoitureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendreVoitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
