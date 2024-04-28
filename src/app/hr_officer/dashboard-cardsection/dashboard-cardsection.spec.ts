import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCardsection } from './dashboard-cardsection';

describe('NotificationComponent', () => {
  let component: DashboardCardsection;
  let fixture: ComponentFixture<DashboardCardsection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardCardsection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardCardsection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
