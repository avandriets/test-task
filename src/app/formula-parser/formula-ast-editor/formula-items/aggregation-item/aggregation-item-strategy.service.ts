import { ComponentType } from '@angular/cdk/overlay';
import { ExistingProvider, Injectable } from '@angular/core';
import { FormulaStrategy } from '../formula-strategy.service';
import { FORMULA_STRATEGY_ACCESSOR } from '../tokens/formula-strategy-accessor.token';
import { AggregationItemComponent } from './aggregation-item.component';

@Injectable({ providedIn: 'root' })
export class AggregationItemStrategy implements FormulaStrategy {
  getComponent(): ComponentType<AggregationItemComponent> {
    return AggregationItemComponent;
  }

  canHandle(): string[] {
    return ['ADDITION', 'SUBTRACTION', 'DIVISION', 'MULTIPLICATION'];
  }
}

export const AGGREGATION_ITEM_STRATEGY_ACCESSOR: ExistingProvider = {
  provide: FORMULA_STRATEGY_ACCESSOR,
  useExisting: AggregationItemStrategy,
  multi: true,
};
