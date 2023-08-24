import { ComponentType } from '@angular/cdk/overlay';
import { ExistingProvider, Injectable } from '@angular/core';
import { FormulaStrategy } from '../formula-strategy.service';
import { EItemComponent } from './e-item.component';
import { FORMULA_STRATEGY_ACCESSOR } from '../tokens/formula-strategy-accessor.token';

@Injectable({ providedIn: 'root' })
export class EItemStrategy implements FormulaStrategy {
  getComponent(): ComponentType<EItemComponent> {
    return EItemComponent;
  }

  canHandle(): string[] {
    return ['E'];
  }
}

export const E_ITEM_STRATEGY_ACCESSOR: ExistingProvider = {
  provide: FORMULA_STRATEGY_ACCESSOR,
  useExisting: EItemStrategy,
  multi: true,
};
