import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrmLeaveAndMedicalComponent } from './hrm-leave-and-medical.component';

describe('HrmLeaveAndMedicalComponent', () => {
  let component: HrmLeaveAndMedicalComponent;
  let fixture: ComponentFixture<HrmLeaveAndMedicalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HrmLeaveAndMedicalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HrmLeaveAndMedicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
