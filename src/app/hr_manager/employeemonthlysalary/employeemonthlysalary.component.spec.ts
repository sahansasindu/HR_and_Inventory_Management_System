import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeemonthlysalaryComponent } from './employeemonthlysalary.component';

describe('EmployeemonthlysalaryComponent', () => {
  let component: EmployeemonthlysalaryComponent;
  let fixture: ComponentFixture<EmployeemonthlysalaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeemonthlysalaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeemonthlysalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
