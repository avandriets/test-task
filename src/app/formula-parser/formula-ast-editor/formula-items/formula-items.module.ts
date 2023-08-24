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
import { NotImplementedComponent } from './not-implemented/not-implemented.component';
import { NOT_IMPLEMENTED_STRATEGY_ACCESSOR } from './not-implemented/not-implemented-strategy.service';
import { AggregationItemComponent } from './aggregation-item/aggregation-item.component';
import { AGGREGATION_ITEM_STRATEGY_ACCESSOR } from './aggregation-item/aggregation-item-strategy.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { FormulaOperationSelectorComponent } from './formula-operation-selector/formula-operation-selector.component';
import { GroupItemComponent } from './group-item/group-item.component';
import { GROUP_ITEM_STRATEGY_ACCESSOR } from './group-item/group-item-strategy.service';

export const formulaComponents: Array<Type<any>> = [
  FormulaItemComponent,
  NumberItemComponent,
  NotImplementedComponent,
  AggregationItemComponent,
  FormulaOperationSelectorComponent,
  GroupItemComponent,
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
    MatMenuModule,
    MatCardModule,
  ],
  declarations: [
    ...formulaComponents,
  ],
  exports: [
    ...formulaComponents,
  ],
  providers: [
    FormulaItemsService,
    NUMBER_ITEM_STRATEGY_ACCESSOR,
    NOT_IMPLEMENTED_STRATEGY_ACCESSOR,
    AGGREGATION_ITEM_STRATEGY_ACCESSOR,
    GROUP_ITEM_STRATEGY_ACCESSOR,
  ],
})
export class FormulaItemsModule {
}
