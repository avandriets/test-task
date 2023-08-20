import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-formula-dashboard',
  templateUrl: './formula-dashboard.component.html',
  styleUrls: ['./formula-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormulaDashboardComponent implements OnInit {
  defaultFormula = '($b + SQRT (SQR($b) - 4 * $a)) / (2 * $a)';
  formula$!: Observable<string | null>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.formula$ = this.activatedRoute.queryParamMap.pipe(
      map(params => params.get('formula')),
    );
  }

  onFormulaUpdate(formulaValue: string): void {
    this.router.navigate(['/'], {
      queryParams: { formula: formulaValue },
    });
  }
}
