import { TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { PrediccionService } from './prediccion.service';

describe('PrediccionService', () => {
  let service: PrediccionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(PrediccionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
