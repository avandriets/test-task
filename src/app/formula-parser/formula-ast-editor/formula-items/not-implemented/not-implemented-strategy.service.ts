import { ComponentType } from '@angular/cdk/overlay';
import { ExistingProvider, Injectable } from '@angular/core';
import { FormulaStrategy } from '../formula-strategy.service';
import { FORMULA_STRATEGY_ACCESSOR } from '../tokens/formula-strategy-accessor.token';
import { NotImplementedComponent } from './not-implemented.component';

@Injectable({ providedIn: 'root' })
export class NotImplementedStrategy implements FormulaStrategy {
  getComponent(): ComponentType<NotImplementedComponent> {
    return NotImplementedComponent;
  }

  canHandle(): string[] {
    return ['NOT-IMPLEMENTED'];
  }
}

export const NOT_IMPLEMENTED_STRATEGY_ACCESSOR: ExistingProvider = {
  provide: FORMULA_STRATEGY_ACCESSOR,
  useExisting: NotImplementedStrategy,
  multi: true,
};
