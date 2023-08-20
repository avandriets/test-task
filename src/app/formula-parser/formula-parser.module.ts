import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormulaDashboardComponent } from './formula-dashboard/formula-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormulaEditorComponent } from './formula-editor/formula-editor.component';
import { FormulaAstViewComponent } from './formula-ast-view/formula-ast-view.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,

    // Angular Material
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  declarations: [
    FormulaDashboardComponent,
    FormulaEditorComponent,
    FormulaAstViewComponent,
  ],
  exports: [
    FormulaDashboardComponent,
  ],
})
export class FormulaParserModule {
}
