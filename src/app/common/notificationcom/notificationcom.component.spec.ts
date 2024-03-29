import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationcomComponent } from './notificationcom.component';

describe('NotificationcomComponent', () => {
  let component: NotificationcomComponent;
  let fixture: ComponentFixture<NotificationcomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotificationcomComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotificationcomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
