import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSalarydetailsComponent } from './update-salarydetails.component';

describe('UpdateSalarydetailsComponent', () => {
  let component: UpdateSalarydetailsComponent;
  let fixture: ComponentFixture<UpdateSalarydetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateSalarydetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateSalarydetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
