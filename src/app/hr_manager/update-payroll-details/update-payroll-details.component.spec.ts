import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePayrollDetailsComponent } from './update-payroll-details.component';

describe('UpdatePayrollDetailsComponent', () => {
  let component: UpdatePayrollDetailsComponent;
  let fixture: ComponentFixture<UpdatePayrollDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdatePayrollDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatePayrollDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
