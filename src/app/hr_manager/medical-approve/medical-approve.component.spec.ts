import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalApproveComponent } from './medical-approve.component';

describe('MedicalApproveComponent', () => {
  let component: MedicalApproveComponent;
  let fixture: ComponentFixture<MedicalApproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MedicalApproveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MedicalApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
