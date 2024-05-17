import { Component } from '@angular/core';

@Component({
  selector: 'app-agent-daily-report',
  templateUrl: './agent-daily-report.component.html',
  styleUrl: './agent-daily-report.component.css'
})
export class AgentDailyReportComponent {

  selectedDate: string='';

  dailyReports: any[] = [];
  totalAmount: number = 0;

  constructor() { }

  search() {
    if (!this.selectedDate) {
      alert("Please select a date");
      return;
    }

    const formDate = new Date(this.selectedDate);
    const formattedDate = formDate.toISOString().split('T')[0];
    console.log('Searching for:', formattedDate);

    this.fetchDailyReports(formattedDate);
  }

  fetchDailyReports(date: string) {

    this.dailyReports = [
      { agentName: 'Agent 1', agencyName: 'Agency 1', amountOfPurchase: 10 },
      { agentName: 'Agent 2', agencyName: 'Agency 2', amountOfPurchase: 20 }
    ];

    this.totalAmount = this.dailyReports.reduce((total, report) => total + report.amountOfPurchase, 0);
  }

}
