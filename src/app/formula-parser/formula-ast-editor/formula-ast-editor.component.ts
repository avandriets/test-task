import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AstModel } from '../models';
import { ActivatedRoute } from '@angular/router';
import { FormulaParserService } from '../services';

@Component({
  selector: 'app-formula-ast-editor',
  templateUrl: './formula-ast-editor.component.html',
  styleUrls: ['./formula-ast-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormulaAstEditorComponent {
  form: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly formulaParserService: FormulaParserService,
  ) {
  }

  generateAstTree(): void {
    this.initForm();
  }

  generateFormula(): void {
    console.log(this.form.value);
  }

  private initForm(): void {
    const ast: AstModel = this.formulaParserService
      .parseFormula(this.route.snapshot.queryParamMap.get('formula') || '');

    this.form = this.fb.group({
      tree: [ast?.getData(), [Validators.required]],
    });
  }
}
