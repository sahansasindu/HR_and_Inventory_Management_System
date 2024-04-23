import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyProductionReportComponent } from './monthly-production-report.component';

describe('MonthlyReportComponent', () => {
  let component: MonthlyProductionReportComponent;
  let fixture: ComponentFixture<MonthlyProductionReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MonthlyProductionReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlyProductionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
