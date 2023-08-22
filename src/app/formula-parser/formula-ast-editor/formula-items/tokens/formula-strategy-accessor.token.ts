import { InjectionToken } from '@angular/core';
import { FormulaStrategy } from '../formula-strategy.service';

export const FORMULA_STRATEGY_ACCESSOR = new InjectionToken<FormulaStrategy>('FormulaStrategy');
