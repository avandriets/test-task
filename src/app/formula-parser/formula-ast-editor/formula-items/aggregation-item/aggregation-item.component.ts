import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BaseFormulaItemComponent } from '../base-formula-item-component.directive';
import { AstExpression, KeyValuePair } from '../../../interfaces';
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

  addItem(typeOfNode: string) {
    let numberItem = null;

    switch (typeOfNode) {
      case 'NUMBER':
        numberItem = this.fb.control({
          type: 'NUMBER',
          value: 0,
        });
        break;
      case 'SUBTRACTION':
        numberItem = this.fb.control({
          "type": "SUBTRACTION",
          "left": {
            "type": "NUMBER",
            "value": 0,
          },
          "right": {
            "type": "NUMBER",
            "value": 0,
          }
        });
        break;
      case 'ADDITION':
        numberItem = this.fb.control({
          "type": "ADDITION",
          "left": {
            "type": "NUMBER",
            "value": 0,
          },
          "right": {
            "type": "NUMBER",
            "value": 0,
          }
        });
        break;
      case 'DIVISION':
        numberItem = this.fb.control({
          "type": "DIVISION",
          "left": {
            "type": "NUMBER",
            "value": 0,
          },
          "right": {
            "type": "NUMBER",
            "value": 0,
          }
        });
        break;
      case 'MULTIPLICATION':
        numberItem = this.fb.control({
          "type": "MULTIPLICATION",
          "left": {
            "type": "NUMBER",
            "value": 0,
          },
          "right": {
            "type": "NUMBER",
            "value": 0,
          }
        });
        break;
      default:
        return;
    }

    this.branchesFormArray.push(numberItem);
  }

  override onItemChange() {
    this.reInitForm();
  }

  private reInitForm(): void {

    if (!this.innerValue) {
      return;
    }

    const numberItem = this.innerValue as AstExpression;

    this.formChangesSubscription?.unsubscribe();

    this.form = this.fb.group({
      type: [numberItem?.type, [Validators.required]],
      branches: this.fb.array([
          this.fb.control(numberItem.left),
          this.fb.control(numberItem.right),
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
