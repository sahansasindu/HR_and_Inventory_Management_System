import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSalarydetailsComponent } from './add-salarydetails.component';

describe('AddSalarydetailsComponent', () => {
  let component: AddSalarydetailsComponent;
  let fixture: ComponentFixture<AddSalarydetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddSalarydetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddSalarydetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
