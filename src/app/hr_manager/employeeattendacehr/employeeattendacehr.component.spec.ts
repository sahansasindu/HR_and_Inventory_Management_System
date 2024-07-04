import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeattendacehrComponent } from './employeeattendacehr.component';

describe('EmployeeattendacehrComponent', () => {
  let component: EmployeeattendacehrComponent;
  let fixture: ComponentFixture<EmployeeattendacehrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeattendacehrComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeattendacehrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
