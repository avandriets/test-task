import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiItemComponent } from './pi-item.component';

describe('NumberItemComponent', () => {
  let component: PiItemComponent;
  let fixture: ComponentFixture<PiItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PiItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PiItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
