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
import { FormulaAstEditorComponent } from './formula-ast-editor/formula-ast-editor.component';
import { FormulaContainerComponent } from './formula-ast-editor/components/formula-container/formula-container.component';
import { MatSelectModule } from '@angular/material/select';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PortalModule } from '@angular/cdk/portal';
import { MatDividerModule } from '@angular/material/divider';
import { FormulaItemsModule } from './formula-ast-editor/formula-items/formula-items.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';

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
    MatSelectModule,
    FlexLayoutModule,
    PortalModule,
    MatDividerModule,
    FormulaItemsModule,
    MatToolbarModule,
    MatTabsModule,
  ],
  declarations: [
    FormulaDashboardComponent,
    FormulaEditorComponent,
    FormulaAstViewComponent,
    FormulaAstEditorComponent,
    FormulaContainerComponent,
  ],
  exports: [
    FormulaDashboardComponent,
  ],
})
export class FormulaParserModule {
}
