import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentWeeklyReportComponent } from './agent-weekly-report.component';

describe('AgentWeeklyReportComponent', () => {
  let component: AgentWeeklyReportComponent;
  let fixture: ComponentFixture<AgentWeeklyReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgentWeeklyReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgentWeeklyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
