import { CdkPortalOutlet, ComponentPortal } from '@angular/cdk/portal';
import { Inject, Injectable, Injector } from '@angular/core';
import { FormulaItemsPortalRef } from './formula-items-portal-ref';
import { AstNode } from '../../interfaces';
import { BaseFormulaItemComponent } from './base-formula-item-component.directive';
import { FORMULA_STRATEGY_ACCESSOR } from './tokens/formula-strategy-accessor.token';
import { FormulaStrategy } from './formula-strategy.service';
import { UI_FORMULA_DATA } from './tokens/formula-data.token';

export interface FormulaItemConfig {
  node?: AstNode;
  disabled?: boolean;
}

@Injectable()
export class FormulaItemsService {

  constructor(
    private injector: Injector,
    @Inject(FORMULA_STRATEGY_ACCESSOR) private readonly formulaStrategy: FormulaStrategy[],
  ) {
  }

  showComponent(cdkPortalOutlet: CdkPortalOutlet, config: FormulaItemConfig): FormulaItemsPortalRef<BaseFormulaItemComponent> {

    const formulaPortalRef = new FormulaItemsPortalRef<BaseFormulaItemComponent>();

    const formulaInjector = this.createInjector(formulaPortalRef, config);

    const nameForStrategy = `${config.node?.type}`;

    const formulaStrategy
      = this.formulaStrategy.find(s => s.canHandle().includes(nameForStrategy))
      ?? this.formulaStrategy.find(s => s.canHandle().includes('NOT-IMPLEMENTED'));

    const componentFormulaPortal = new ComponentPortal<BaseFormulaItemComponent>(formulaStrategy.getComponent(), null, formulaInjector);

    const componentRef = cdkPortalOutlet.attachComponentPortal(componentFormulaPortal);

    formulaPortalRef.portal = componentFormulaPortal;
    formulaPortalRef.component = componentRef;
    formulaPortalRef.value = config.node;

    return formulaPortalRef;
  }

  private createInjector(itemPortalRef: FormulaItemsPortalRef<BaseFormulaItemComponent>, config: FormulaItemConfig): Injector {

    return Injector.create({
      parent: this.injector,
      providers: [
        { provide: FormulaItemsPortalRef, useValue: itemPortalRef },
        { provide: UI_FORMULA_DATA, useValue: config },
      ],
    });
  }
}
