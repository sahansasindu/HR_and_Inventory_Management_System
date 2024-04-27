import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyProductionReportComponent } from './weekly-production-report.component';

describe('WeeklyReportComponent', () => {
  let component: WeeklyProductionReportComponent;
  let fixture: ComponentFixture<WeeklyProductionReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeeklyProductionReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeeklyProductionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
