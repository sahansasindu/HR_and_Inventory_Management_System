import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDeductiondetailsComponent } from './update-deductiondetails.component';

describe('UpdateDeductiondetailsComponent', () => {
  let component: UpdateDeductiondetailsComponent;
  let fixture: ComponentFixture<UpdateDeductiondetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateDeductiondetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateDeductiondetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
