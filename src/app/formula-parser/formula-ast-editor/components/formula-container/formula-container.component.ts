import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  Output
} from '@angular/core';
import {
  ControlValueAccessor,
  FormArray,
  FormBuilder,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { AstExpression, AstNode } from '../../../interfaces';
import { noop, Subscription } from 'rxjs';

@Component({
  selector: 'app-formula-container',
  templateUrl: './formula-container.component.html',
  styleUrls: ['./formula-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormulaContainerComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => FormulaContainerComponent),
      multi: true,
    },
  ],
})
export class FormulaContainerComponent implements ControlValueAccessor, OnDestroy, Validator {
  @Output() valueChange = new EventEmitter<AstNode>();

  form: FormGroup;
  operators: string[] = ['ADDITION', 'SUBTRACTION', 'DIVISION', 'MULTIPLICATION'];

  private innerValue: AstNode & AstExpression = null;
  private innerDisabled = false;
  private formChangesSubscription?: Subscription;
  private changeFn: (s: AstNode) => void = noop;
  private touchedFn: () => void = noop;

  constructor(
    private readonly fb: FormBuilder,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  @Input() set disabled(v: boolean | string) {
    const newValue = v === true || v === 'true';
    if (this.innerDisabled === newValue) {
      return;
    }
    this.innerDisabled = newValue;
    if (this.form) {
      this.setDisabledState(this.innerDisabled);
    }
  }

  get disabled(): boolean | string {
    return this.innerDisabled;
  }

  @Input() set value(v: AstNode & AstExpression) {
    if (this.innerValue === v) {
      return;
    }
    this.innerValue = v;

    this.reInitForm();
  }

  get value(): AstNode & AstExpression {
    return this.innerValue;
  }

  get branchesFormArray(): FormArray {
    return this.form.get('branches') as FormArray;
  }

  ngOnDestroy(): void {
    this.formChangesSubscription?.unsubscribe();
  }

  validate(): ValidationErrors | null {
    return this.form.valid ? null : { invalid: true };
  }

  writeValue(tree: AstNode & AstExpression): void {
    this.value = { ...tree };
  }

  registerOnChange(fn: any): void {
    this.changeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this.touchedFn = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (!this.form) {
      return;
    }

    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }

    this.disabled = isDisabled;
  }

  onDeleteGroup(index: number): void {
    this.branchesFormArray.removeAt(index);
    this.changeDetectorRef.markForCheck();
  }

  private reInitForm(): void {

    this.formChangesSubscription?.unsubscribe();

    // this.form = this.fb.group({
    //   type: [this.innerValue?.type, [Validators.required]],
    //   branches: this.fb.array([
    //       this.fb.control(this.innerValue.left),
    //       this.fb.control(this.innerValue.right),
    //     ],
    //   ),
    // });

    this.form = this.fb.group({
      branches: this.fb.array([
          this.fb.control(this.innerValue),
        ],
      ),
    });

    this.changeDetectorRef.detectChanges();

    this.setDisabledState(this.innerDisabled);

    this.formChangesSubscription = this.form.valueChanges.subscribe(newValue => {

      console.log('++ value change ++', newValue);
      this.innerValue = newValue;
      this.changeFn(newValue);
      this.touchedFn();

    });

    this.changeDetectorRef.detectChanges();
  }
}
