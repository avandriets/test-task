import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AstModel } from '../models';
import { ActivatedRoute } from '@angular/router';
import { FormulaParserService } from '../services';
import { AstNode } from '../interfaces';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-formula-ast-editor',
  templateUrl: './formula-ast-editor.component.html',
  styleUrls: ['./formula-ast-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormulaAstEditorComponent {
  form: FormGroup;
  astFormula$: Subject<string> = new Subject<string>();

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
    const ast = new AstModel(this.getDataTree());
    this.astFormula$.next(ast.getFormula());
  }

  private initForm(): void {
    const ast: AstModel = this.formulaParserService
      .parseFormula(this.route.snapshot.queryParamMap.get('formula') || '');

    this.form = this.fb.group({
      tree: [ast?.getData(), [Validators.required]],
    });
  }

  private getDataTree(): AstNode {
    const cloneBT = (root: any): any => {
      if (!root) {
        return null;
      }

      const newNode: { [key: string]: any } = {
        type: root.type,
      };

      switch (root.type) {
        case 'PAREN':
          newNode['expression'] = cloneBT(root?.branches?.[0] ?? root.expression);
          break;
        case 'E':
        case 'PI':
        case 'NUMBER':
          newNode['value'] = root.value;
          break;
        case 'NEGATION':
          newNode['expression'] = cloneBT(root?.branches?.[0] ?? root.expression);
          break;
        case 'POWER':
          newNode['expression'] = cloneBT(root?.branches?.[0] ?? root.expression);
          newNode['power'] = cloneBT(root?.branches?.[1] ?? root.power);
          break;
        case 'FUNCTION':
          newNode['name'] = root.name;
          newNode['arguments'] = (root?.branches ?? root.arguments)
            .map((e: any) => cloneBT(e));
          break;
        case 'ADDITION':
        case 'SUBTRACTION':
        case 'DIVISION':
        case 'MULTIPLICATION':
          newNode['left'] = cloneBT(root?.branches?.[0] ?? root.left);
          newNode['right'] = cloneBT(root?.branches?.[1] ?? root.right);
      }

      return newNode;
    };

    return cloneBT(this.form.value.tree?.branches?.[0] ?? this.form.value.tree);
  }
}
