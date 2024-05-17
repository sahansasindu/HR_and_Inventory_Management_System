import { Component } from '@angular/core';

@Component({
  selector: 'app-agent-weekly-report',
  templateUrl: './agent-weekly-report.component.html',
  styleUrl: './agent-weekly-report.component.css'
})
export class AgentWeeklyReportComponent {

  fromDate: string = '';
  toDate: string = '';
  dailyReports: any[] = [];
  totalAmount: number = 0;


  constructor() {
  }

  search() {
    if (!this.fromDate || !this.toDate) {
      alert("Please select both from and to dates");
      return;
    }
    const fromFormattedDate = new Date(this.fromDate).toISOString().split('T')[0];
    const toFormattedDate = new Date(this.toDate).toISOString().split('T')[0];
    console.log('Searching from:', fromFormattedDate, 'to:', toFormattedDate);


    this.fetchDailyReports(fromFormattedDate, toFormattedDate);
  }

  fetchDailyReports(fromDate: string, toDate: string) {

    this.dailyReports = [
      { agentName: 'Agent 1', agencyName: 'Agency 1', amountOfPurchase: 10 },
      { agentName: 'Agent 2', agencyName: 'Agency 2', amountOfPurchase: 20 }
    ];

    this.totalAmount = this.dailyReports.reduce((total, report) => total + report.amountOfPurchase, 0);
  }
}
