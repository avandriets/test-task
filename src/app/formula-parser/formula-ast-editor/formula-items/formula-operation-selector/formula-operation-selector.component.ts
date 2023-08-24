import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input, Output,
} from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-formula-operation-selector',
  templateUrl: './formula-operation-selector.component.html',
  styleUrls: ['./formula-operation-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormulaOperationSelectorComponent {
  @Output() valueChange = new EventEmitter<FormControl>();
  private innerDisabled = false;

  constructor(private readonly fb: FormBuilder) {
  }

  @Input() set disabled(v: boolean) {
    const newValue = v === true;
    if (this.innerDisabled === newValue) {
      return;
    }
    this.innerDisabled = newValue;
  }

  get disabled(): boolean {
    return this.innerDisabled;
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
          type: 'SUBTRACTION',
          left: {
            type: 'NUMBER',
            value: 0,
          },
          right: {
            type: 'NUMBER',
            value: 0,
          }
        });
        break;
      case 'ADDITION':
        numberItem = this.fb.control({
          type: "ADDITION",
          left: {
            type: 'NUMBER',
            value: 0,
          },
          right: {
            type: 'NUMBER',
            value: 0,
          }
        });
        break;
      case 'DIVISION':
        numberItem = this.fb.control({
          type: "DIVISION",
          left: {
            type: 'NUMBER',
            value: 0,
          },
          right: {
            type: 'NUMBER',
            value: 0,
          }
        });
        break;
      case 'MULTIPLICATION':
        numberItem = this.fb.control({
          type: "MULTIPLICATION",
          left: {
            type: 'NUMBER',
            value: 0,
          },
          right: {
            type: 'NUMBER',
            value: 0,
          }
        });
        break;
      default:
        return;
    }

    this.valueChange.emit(numberItem);
  }

}
