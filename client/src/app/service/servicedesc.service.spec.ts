import { TestBed, inject } from '@angular/core/testing';

import { ServicedescService } from './servicedesc.service';

describe('ServicedescService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServicedescService]
    });
  });

  it('should be created', inject([ServicedescService], (service: ServicedescService) => {
    expect(service).toBeTruthy();
  }));
});
