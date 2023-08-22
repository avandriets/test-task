import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaContainerComponent } from './formula-container.component';

describe('TopLevelComponent', () => {
  let component: FormulaContainerComponent;
  let fixture: ComponentFixture<FormulaContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulaContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
