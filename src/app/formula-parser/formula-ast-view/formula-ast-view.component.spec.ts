import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaAstViewComponent } from './formula-ast-view.component';

describe('FormulaAstViewComponent', () => {
  let component: FormulaAstViewComponent;
  let fixture: ComponentFixture<FormulaAstViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulaAstViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaAstViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
