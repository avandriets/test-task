import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { BaseFormulaItemComponent } from '../base-formula-item-component.directive';
import { Subscription } from 'rxjs';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { AstGroup } from '../../../interfaces';
import { ALL_OPERATORS } from '../utils/constants';

@Component({
  selector: 'app-group-item',
  templateUrl: './group-item.component.html',
  styleUrls: ['./group-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupItemComponent extends BaseFormulaItemComponent implements OnInit, OnDestroy {
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

  get branchesFormArray(): FormArray {
    return this.form.get('branches') as FormArray;
  }

  ngOnDestroy(): void {
    this.formChangesSubscription?.unsubscribe();
  }

  override onItemChange() {
    this.reInitForm();
  }

  onDeleteGroup(index: number): void {
    this.branchesFormArray.removeAt(index);
    this.changeDetectorRef.markForCheck();
  }

  onAddItem(item: any): void {
    this.branchesFormArray.push(item);
  }

  private reInitForm(): void {

    if (!this.innerValue) {
      return;
    }

    const expressionItem = this.innerValue as AstGroup;

    this.formChangesSubscription?.unsubscribe();

    this.form = this.fb.group({
      type: [expressionItem?.type, [Validators.required]],
      branches: this.fb.array([
          this.fb.control(expressionItem.expression),
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
