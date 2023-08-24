import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggregationItemComponent } from './aggregation-item.component';

describe('AggregationItemComponent', () => {
  let component: AggregationItemComponent;
  let fixture: ComponentFixture<AggregationItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggregationItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AggregationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
