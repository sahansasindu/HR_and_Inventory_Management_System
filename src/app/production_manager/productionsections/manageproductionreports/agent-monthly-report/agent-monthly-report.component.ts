import { Component } from '@angular/core';

@Component({
  selector: 'app-agent-monthly-report',
  templateUrl: './agent-monthly-report.component.html',
  styleUrl: './agent-monthly-report.component.css'
})
export class AgentMonthlyReportComponent {

  fromMonth: string = '';
  dailyReports: any[] = [];
  totalAmount: number = 0;

  constructor() { }

  search() {
    if (!this.fromMonth) {
      alert("Please select month");
      return;
    }

    const fromFormattedDate = this.fromMonth;
    console.log('Searching from:', fromFormattedDate);

    // Replace this with your actual backend call
    this.fetchDailyReports(fromFormattedDate);
  }

  fetchDailyReports(fromDate: string) {

    this.dailyReports = [
      { agentName: 'Agent 1', agencyName: 'Agency 1', amountOfPurchase: 10 },
      { agentName: 'Agent 2', agencyName: 'Agency 2', amountOfPurchase: 20 }
    ];

    this.totalAmount = this.dailyReports.reduce((total, report) => total + report.amountOfPurchase, 0);
  }
}
