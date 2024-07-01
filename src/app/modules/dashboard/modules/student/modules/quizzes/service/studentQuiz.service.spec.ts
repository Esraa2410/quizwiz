/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StudentQuizService } from './studentQuiz.service';

describe('Service: StudentQuiz', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudentQuizService]
    });
  });

  it('should ...', inject([StudentQuizService], (service: StudentQuizService) => {
    expect(service).toBeTruthy();
  }));
});
