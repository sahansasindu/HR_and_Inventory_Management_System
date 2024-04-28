import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Notificationbar } from './notificationbar';

describe('Notification1Component', () => {
  let component: Notificationbar;
  let fixture: ComponentFixture<Notificationbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Notificationbar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Notificationbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
