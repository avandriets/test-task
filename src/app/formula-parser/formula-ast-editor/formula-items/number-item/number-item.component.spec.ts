import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberItemComponent } from './number-item.component';

describe('NumberItemComponent', () => {
  let component: NumberItemComponent;
  let fixture: ComponentFixture<NumberItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumberItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
