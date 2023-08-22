import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef, EventEmitter } from '@angular/core';
import { BaseFormulaItemComponent } from './base-formula-item-component.directive';
import { AstNode } from '../../interfaces';

export class FormulaItemsPortalRef<T extends BaseFormulaItemComponent> {
  private componentPortal: ComponentPortal<T>;
  private componentRef: ComponentRef<T>;

  set portal(value: ComponentPortal<T>) {
    this.componentPortal = value;
  }

  set component(value: ComponentRef<T>) {
    this.componentRef = value;
  }

  set disabled(value: boolean) {
    this.componentRef.instance.disabled = value;
    this.componentRef.changeDetectorRef.markForCheck();
  }

  set value(v: AstNode) {
    this.componentRef.instance.value = v;
    this.componentRef.changeDetectorRef.markForCheck();
  }

  get valueChangeEvent(): EventEmitter<AstNode> {
    return this.componentInstance.valueChange;
  }

  get componentInstance(): BaseFormulaItemComponent {
    return this.componentRef.instance;
  }

  destroy(): void {
    if (this.componentPortal.isAttached) {
      this.componentPortal.detach();
    }
  }
}
