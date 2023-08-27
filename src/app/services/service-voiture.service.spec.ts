import { TestBed } from '@angular/core/testing';

import { ServiceVoitureService } from './service-voiture.service';

describe('ServiceVoitureService', () => {
  let service: ServiceVoitureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceVoitureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
