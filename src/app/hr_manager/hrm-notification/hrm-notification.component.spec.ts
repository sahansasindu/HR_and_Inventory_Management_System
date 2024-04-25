import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrmNotificationComponent } from './hrm-notification.component';

describe('HrmNotificationComponent', () => {
  let component: HrmNotificationComponent;
  let fixture: ComponentFixture<HrmNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HrmNotificationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HrmNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
