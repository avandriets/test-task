import { TestBed } from '@angular/core/testing';

import { FormulaParserService } from './formula-parser.service';

describe('FormulaParserService', () => {
  let service: FormulaParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormulaParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
