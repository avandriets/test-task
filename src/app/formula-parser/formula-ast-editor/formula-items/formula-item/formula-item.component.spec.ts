import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaItemComponent } from './formula-item.component';

describe('FormulaItemComponent', () => {
  let component: FormulaItemComponent;
  let fixture: ComponentFixture<FormulaItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulaItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
