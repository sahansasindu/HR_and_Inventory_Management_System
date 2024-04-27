import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrmAttendanceComponent } from './hrm-attendance.component';

describe('HrmAttendanceComponent', () => {
  let component: HrmAttendanceComponent;
  let fixture: ComponentFixture<HrmAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HrmAttendanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HrmAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
