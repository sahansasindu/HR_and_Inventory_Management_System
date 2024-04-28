import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAllowancedetailsComponent } from './update-allowancedetails.component';

describe('UpdateAllowancedetailsComponent', () => {
  let component: UpdateAllowancedetailsComponent;
  let fixture: ComponentFixture<UpdateAllowancedetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateAllowancedetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateAllowancedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
