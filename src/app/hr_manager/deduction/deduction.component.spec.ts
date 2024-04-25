import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeductionComponent } from './deduction.component';

describe('AddDeductionComponent', () => {
  let component: DeductionComponent;
  let fixture: ComponentFixture<DeductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeductionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
