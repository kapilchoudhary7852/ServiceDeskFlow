import { TestBed, inject } from '@angular/core/testing';

import { NotifytoService } from './notifyto.service';

describe('NotifytoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotifytoService]
    });
  });

  it('should be created', inject([NotifytoService], (service: NotifytoService) => {
    expect(service).toBeTruthy();
  }));
});
