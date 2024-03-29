import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpSalaryComponent } from './emp-salary.component';

describe('EmpSalaryComponent', () => {
  let component: EmpSalaryComponent;
  let fixture: ComponentFixture<EmpSalaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmpSalaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmpSalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
