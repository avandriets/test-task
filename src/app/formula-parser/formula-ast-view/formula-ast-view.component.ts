import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { FormulaParserService } from '../services';
import { AstModel } from '../models';

@Component({
  selector: 'app-formula-ast-view',
  templateUrl: './formula-ast-view.component.html',
  styleUrls: ['./formula-ast-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormulaAstViewComponent {
  astText$: Subject<string> = new Subject<string>();

  constructor(
    private route: ActivatedRoute,
    private formulaParserService: FormulaParserService,
  ) {
  }

  formulaToASTText(): void {
    const ast: AstModel = this.formulaParserService
      .parseFormula(this.route.snapshot.queryParamMap.get('formula') || '');

    this.astText$.next(ast.getAstString());

    console.log('The ast is:', ast.getData());
    console.log(`Formula ${ast.getFormula()}`);
  }

  aAstToFormula(): void {
    console.log('To be implemented');
  }
}
