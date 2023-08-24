import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EItemComponent } from './e-item.component';

describe('NumberItemComponent', () => {
  let component: EItemComponent;
  let fixture: ComponentFixture<EItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
