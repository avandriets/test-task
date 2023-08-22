import { ComponentType } from '@angular/cdk/overlay';
import { ExistingProvider, Injectable } from '@angular/core';
import { FormulaStrategy } from '../formula-strategy.service';
import { NumberItemComponent } from './number-item.component';
import { FORMULA_STRATEGY_ACCESSOR } from '../tokens/formula-strategy-accessor.token';

@Injectable({ providedIn: 'root' })
export class NumberItemStrategy implements FormulaStrategy {
  getComponent(): ComponentType<NumberItemComponent> {
    return NumberItemComponent;
  }

  canHandle(): string[] {
    return ['NUMBER'];
  }
}

export const NUMBER_ITEM_STRATEGY_ACCESSOR: ExistingProvider = {
  provide: FORMULA_STRATEGY_ACCESSOR,
  useExisting: NumberItemStrategy,
  multi: true,
};
