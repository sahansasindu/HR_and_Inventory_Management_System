import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentMonthlyReportComponent } from './agent-monthly-report.component';

describe('AgentMonthlyReportComponent', () => {
  let component: AgentMonthlyReportComponent;
  let fixture: ComponentFixture<AgentMonthlyReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgentMonthlyReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgentMonthlyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
