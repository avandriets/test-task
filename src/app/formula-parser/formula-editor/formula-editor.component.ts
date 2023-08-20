import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-formula-editor',
  templateUrl: './formula-editor.component.html',
  styleUrls: ['./formula-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormulaEditorComponent implements OnInit, OnDestroy, OnChanges {
  form!: FormGroup;
  searchInput$!: Subscription;

  @Input() value: string | null = '';

  get valueControl(): AbstractControl {
    return this.form.get('value');
  }

  @Output() update = new EventEmitter<string>();

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      value: this.value,
    });

    this.searchInput$ = this.valueControl.valueChanges.subscribe(val => this.update.emit(val));
  }

  ngOnDestroy(): void {
    this.searchInput$.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateFormValue(changes);
  }

  private updateFormValue(changes: SimpleChanges): void {
    if (!changes['value'] || !this.form) {
      return;
    }

    this.form.patchValue({
      value: this.value || '',
    });
  }
}
