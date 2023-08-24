import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { BaseFormulaItemComponent } from '../base-formula-item-component.directive';
import { Subscription } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { AstNumber } from '../../../interfaces';

@Component({
  selector: 'app-PI-item',
  templateUrl: './e-item.component.html',
  styleUrls: ['./e-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EItemComponent extends BaseFormulaItemComponent implements OnInit, OnDestroy {
  private formChangesSubscription?: Subscription;

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly fb: FormBuilder,
  ) {
    super();
  }

  ngOnInit(): void {
    this.reInitForm();
  }

  ngOnDestroy(): void {
    this.formChangesSubscription?.unsubscribe();
  }

  override onItemChange() {
    this.reInitForm();
  }

  private reInitForm(): void {

    if (!this.innerValue) {
      return;
    }

    const numberItem = this.innerValue as AstNumber;

    this.formChangesSubscription?.unsubscribe();

    this.form = this.fb.group({
      value: [numberItem.value, [Validators.required]],
    });

    this.setDisabledState(this.innerDisabled);

    this.formChangesSubscription = this.form.valueChanges.subscribe(formValue => {

      this.innerValue = {
        ...this.value,
        ...formValue,
        value: formValue.value,
      };
      this.valueChange.emit(this.innerValue);

    });

    this.changeDetectorRef.markForCheck();
  }
}
