import { ComponentType } from '@angular/cdk/overlay';
import { ExistingProvider, Injectable } from '@angular/core';
import { FormulaStrategy } from '../formula-strategy.service';
import { PiItemComponent } from './pi-item.component';
import { FORMULA_STRATEGY_ACCESSOR } from '../tokens/formula-strategy-accessor.token';

@Injectable({ providedIn: 'root' })
export class PiItemStrategy implements FormulaStrategy {
  getComponent(): ComponentType<PiItemComponent> {
    return PiItemComponent;
  }

  canHandle(): string[] {
    return ['PI'];
  }
}

export const PI_ITEM_STRATEGY_ACCESSOR: ExistingProvider = {
  provide: FORMULA_STRATEGY_ACCESSOR,
  useExisting: PiItemStrategy,
  multi: true,
};
