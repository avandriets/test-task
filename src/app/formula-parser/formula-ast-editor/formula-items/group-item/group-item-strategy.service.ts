import { ComponentType } from '@angular/cdk/overlay';
import { ExistingProvider, Injectable } from '@angular/core';
import { FormulaStrategy } from '../formula-strategy.service';
import { GroupItemComponent } from './group-item.component';
import { FORMULA_STRATEGY_ACCESSOR } from '../tokens/formula-strategy-accessor.token';

@Injectable({ providedIn: 'root' })
export class GroupItemStrategy implements FormulaStrategy {
  getComponent(): ComponentType<GroupItemComponent> {
    return GroupItemComponent;
  }

  canHandle(): string[] {
    return ['PAREN'];
  }
}

export const GROUP_ITEM_STRATEGY_ACCESSOR: ExistingProvider = {
  provide: FORMULA_STRATEGY_ACCESSOR,
  useExisting: GroupItemStrategy,
  multi: true,
};
