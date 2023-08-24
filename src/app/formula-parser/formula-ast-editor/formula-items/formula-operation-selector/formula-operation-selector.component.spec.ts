import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaOperationSelectorComponent } from './formula-operation-selector.component';

describe('FormulaOperationSelectorComponent', () => {
  let component: FormulaOperationSelectorComponent;
  let fixture: ComponentFixture<FormulaOperationSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulaOperationSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaOperationSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
