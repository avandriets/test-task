import { ComponentType } from '@angular/cdk/overlay';
import { BaseFormulaItemComponent } from './base-formula-item-component.directive';

export interface FormulaStrategy {
  getComponent(): ComponentType<BaseFormulaItemComponent>;
  canHandle(): string[];
}
