import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyProductionReportComponent } from './daily-production-report.component';

describe('DailyReportComponent', () => {
  let component: DailyProductionReportComponent;
  let fixture: ComponentFixture<DailyProductionReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DailyProductionReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyProductionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
