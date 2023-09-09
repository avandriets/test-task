import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BaseFormulaItemComponent } from '../base-formula-item-component.directive';
import { KeyValuePair } from '../../../interfaces';
import { ALL_OPERATORS } from '../utils/constants';

@Component({
  selector: 'app-aggregation-item',
  templateUrl: './aggregation-item.component.html',
  styleUrls: ['./aggregation-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AggregationItemComponent extends BaseFormulaItemComponent implements OnInit, OnDestroy {
  operators: KeyValuePair[] = ALL_OPERATORS;

  private formChangesSubscription?: Subscription;

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly fb: FormBuilder,
  ) {
    super();
  }

  get branchesFormArray(): FormArray {
    return this.form.get('branches') as FormArray;
  }

  ngOnInit(): void {
    this.reInitForm();
  }

  ngOnDestroy(): void {
    this.formChangesSubscription?.unsubscribe();
  }

  onDeleteGroup(index: number): void {
    this.branchesFormArray.removeAt(index);
    this.changeDetectorRef.markForCheck();
  }

  onAddItem(item: any): void {
    this.branchesFormArray.push(item);
  }

  override onItemChange() {
    this.reInitForm();
  }

  private reInitForm(): void {

    if (!this.innerValue) {
      return;
    }

    const numberItem = this.innerValue as any;

    this.formChangesSubscription?.unsubscribe();

    this.form = this.fb.group({
      type: [numberItem?.type, [Validators.required]],
      branches: this.fb.array([
          this.fb.control(numberItem.left ?? numberItem.expression),
          this.fb.control(numberItem.right ?? numberItem.power),
        ],
      ),
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
