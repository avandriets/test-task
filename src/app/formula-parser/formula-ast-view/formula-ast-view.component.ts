import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { FormulaParserService } from '../services';
import { AstModel } from '../models';

@Component({
  selector: 'app-formula-ast-view',
  templateUrl: './formula-ast-view.component.html',
  styleUrls: ['./formula-ast-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormulaAstViewComponent {
  astText$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  astFormula$: Subject<string> = new Subject<string>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly formulaParserService: FormulaParserService,
  ) {
  }

  formulaToASTText(): void {
    const ast: AstModel = this.formulaParserService
      .parseFormula(this.route.snapshot.queryParamMap.get('formula') || '');

    this.astText$.next(ast.getAstString());
  }

  aAstToFormula(): void {
    const ast: AstModel = this.formulaParserService
      .parseFormula(this.route.snapshot.queryParamMap.get('formula') || '');

    this.astFormula$.next(ast.getFormula());
  }
}
