/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Curso2Service } from './curso2.service';

describe('Service: Curso2', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Curso2Service]
    });
  });

  it('should ...', inject([Curso2Service], (service: Curso2Service) => {
    expect(service).toBeTruthy();
  }));
});
