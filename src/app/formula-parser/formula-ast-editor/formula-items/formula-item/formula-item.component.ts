import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  Output,
  ViewChild
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { AstNode } from '../../../interfaces';
import { filter, noop, Subscription } from 'rxjs';
import { CdkPortalOutlet } from '@angular/cdk/portal';
import { BaseFormulaItemComponent } from '../base-formula-item-component.directive';
import { FormulaItemsPortalRef } from '../formula-items-portal-ref';
import { FormulaItemsService } from '../formula-items.service';

@Component({
  selector: 'app-formula-item',
  templateUrl: './formula-item.component.html',
  styleUrls: ['./formula-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormulaItemComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => FormulaItemComponent),
      multi: true,
    },
  ],
})
export class FormulaItemComponent implements ControlValueAccessor, OnDestroy, Validator {
  @ViewChild(CdkPortalOutlet, { static: true }) formulaItemEditorPortal!: CdkPortalOutlet;

  @Output() valueChange = new EventEmitter<AstNode>();
  @Output() delete = new EventEmitter<AstNode>();

  private formChangesSubscription?: Subscription;
  private innerValue?: AstNode;
  private innerDisabled = false;
  private changeFn: (v: AstNode) => void = noop;
  private touchedFn: () => void = noop;
  private formulaItemPortalRef!: FormulaItemsPortalRef<BaseFormulaItemComponent>;

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly formulaItemsService: FormulaItemsService,
  ) {
  }

  @Input() set disabled(v: boolean | string) {
    const newValue = v === true || v === 'true';
    if (this.innerDisabled === newValue) {
      return;
    }
    this.innerDisabled = newValue;
    this.formulaItemPortalRef?.componentInstance.setDisabledState(this.innerDisabled);
  }

  get disabled(): boolean | string {
    return this.innerDisabled;
  }

  @Input() set value(v: AstNode | undefined) {
    if (this.innerValue === v) {
      return;
    }
    this.innerValue = v;

    this.initFormulaPortalRef();
  }

  get value(): AstNode | undefined {
    return this.innerValue;
  }

  ngOnDestroy(): void {
    this.formChangesSubscription?.unsubscribe();
    this.formulaItemPortalRef?.destroy();
  }

  writeValue(v: AstNode): void {
    this.value = { ...v };
  }

  registerOnChange(fn: any): void {
    this.changeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this.touchedFn = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.formulaItemPortalRef?.componentInstance.setDisabledState(isDisabled);
    this.disabled = isDisabled;
  }

  validate(): ValidationErrors | null {
    const itemInvalid = !!this.formulaItemPortalRef?.componentInstance.form?.invalid;

    return itemInvalid ? { ItemValid: false } : null;
  }

  onDelete(): void {
    if (this.disabled) {
      return;
    }

    this.delete.emit(this.value);
  }

  private initFormulaPortalRef(): void {
    if (!this.innerValue) {
      return;
    }

    this.validate();

    this.formulaItemPortalRef = this.formulaItemsService.showComponent(this.formulaItemEditorPortal, {
      node: this.innerValue,
      disabled: this.innerDisabled,
    });

    this.changeDetectorRef.markForCheck();

    this.formChangesSubscription = this.formulaItemPortalRef.valueChangeEvent
      .pipe(
        filter(data => !!data),
      )
      .subscribe((newItem: any) => {

        this.innerValue = newItem;

        this.changeFn(this.innerValue);
        this.touchedFn();
      });
  }
}
