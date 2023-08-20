import { Injectable } from '@angular/core';

// @ts-ignore
import * as Parser from '../../parser/formula-parser.js';
import { AstModel } from '../models';

@Injectable({
  providedIn: 'root'
})
export class FormulaParserService {
  private parse = Parser.parse;

  parseFormula(formula: string): AstModel | null {
    return formula ? new AstModel(this.parse(formula)) : null;
  }
}
