import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaAstEditorComponent } from './formula-ast-editor.component';

describe('FormulaAstEditorComponent', () => {
  let component: FormulaAstEditorComponent;
  let fixture: ComponentFixture<FormulaAstEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulaAstEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaAstEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
