import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrmUpdateEmployeeDetailsComponent } from './hrm-update-employee-details.component';

describe('HrmUpdateEmployeeDetailsComponent', () => {
  let component: HrmUpdateEmployeeDetailsComponent;
  let fixture: ComponentFixture<HrmUpdateEmployeeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HrmUpdateEmployeeDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HrmUpdateEmployeeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
