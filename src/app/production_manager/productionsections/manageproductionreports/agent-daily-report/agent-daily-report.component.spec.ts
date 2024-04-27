import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentDailyReportComponent } from './agent-daily-report.component';

describe('AgentDailyReportComponent', () => {
  let component: AgentDailyReportComponent;
  let fixture: ComponentFixture<AgentDailyReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgentDailyReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgentDailyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
