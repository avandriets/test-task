import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AstNode } from '../../interfaces';

@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class BaseFormulaItemComponent {
  @Output() valueChange = new EventEmitter<AstNode>();
  form: FormGroup;

  protected innerDisabled: boolean;
  protected innerValue: AstNode;

  @Input() set value(v: AstNode) {
    const newValue = v;
    if (this.innerValue === newValue) {
      return;
    }
    this.innerValue = newValue;
    this.onItemChange();
  }

  get value(): AstNode {
    return this.innerValue;
  }

  @Input() set disabled(v: boolean) {
    const newValue = v === true || v as unknown === 'true';
    if (this.innerDisabled === newValue) {
      return;
    }
    this.innerDisabled = newValue;
    if (this.form) {
      this.setDisabledState(this.innerDisabled);
    }
  }

  get disabled(): boolean {
    return this.innerDisabled;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.form?.disable();
    } else {
      this.form?.enable();
    }

    this.disabled = isDisabled;
  }

  onItemChange(): void {
  }
}
