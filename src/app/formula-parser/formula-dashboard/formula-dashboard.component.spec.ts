import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaDashboardComponent } from './formula-dashboard.component';

describe('FormulaDashboardComponent', () => {
  let component: FormulaDashboardComponent;
  let fixture: ComponentFixture<FormulaDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulaDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
