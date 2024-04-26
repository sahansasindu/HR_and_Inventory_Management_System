import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryAdvanceComponent } from './salary-advance.component';

describe('SalaryAdvanceComponent', () => {
  let component: SalaryAdvanceComponent;
  let fixture: ComponentFixture<SalaryAdvanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalaryAdvanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalaryAdvanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
