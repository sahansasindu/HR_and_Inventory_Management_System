import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveMedicalComponent } from './leave-medical.component';

describe('LeaveMedicalComponent', () => {
  let component: LeaveMedicalComponent;
  let fixture: ComponentFixture<LeaveMedicalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeaveMedicalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeaveMedicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
