import { ComponentType } from '@angular/cdk/overlay';
import { ExistingProvider, Injectable } from '@angular/core';
import { FormulaStrategy } from '../formula-strategy.service';
import { FunctionItemComponent } from './function-item.component';
import { FORMULA_STRATEGY_ACCESSOR } from '../tokens/formula-strategy-accessor.token';

@Injectable({ providedIn: 'root' })
export class FunctionItemStrategy implements FormulaStrategy {
  getComponent(): ComponentType<FunctionItemComponent> {
    return FunctionItemComponent;
  }

  canHandle(): string[] {
    return ['FUNCTION'];
  }
}

export const FUNCTION_ITEM_STRATEGY_ACCESSOR: ExistingProvider = {
  provide: FORMULA_STRATEGY_ACCESSOR,
  useExisting: FunctionItemStrategy,
  multi: true,
};
