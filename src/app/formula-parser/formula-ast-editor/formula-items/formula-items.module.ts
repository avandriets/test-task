import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormulaItemComponent } from './formula-item/formula-item.component';
import { PortalModule } from '@angular/cdk/portal';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormulaItemsService } from './formula-items.service';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { NumberItemComponent } from './number-item/number-item.component';
import { NUMBER_ITEM_STRATEGY_ACCESSOR } from './number-item/number-item-strategy.service';

export const formulaComponents: Array<Type<any>> = [
  FormulaItemComponent,
];

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
  ],
  declarations: [
    ...formulaComponents,
    NumberItemComponent,
  ],
  exports: [
    FormulaItemComponent,
  ],
  providers: [
    FormulaItemsService,
    NUMBER_ITEM_STRATEGY_ACCESSOR,
  ],
})
export class FormulaItemsModule {
}
