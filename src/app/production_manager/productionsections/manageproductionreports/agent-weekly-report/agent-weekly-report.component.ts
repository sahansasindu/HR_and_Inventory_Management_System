import { Component } from '@angular/core';
import {AxiosService} from "../../../../axios.service";

@Component({
  selector: 'app-agent-weekly-report',
  templateUrl: './agent-weekly-report.component.html',
  styleUrl: './agent-weekly-report.component.css'
})
export class AgentWeeklyReportComponent {

  fromDate: string = '';
  toDate: string = '';
  weeklyReports: any[] = [];
  totalAmount: number = 0;


  constructor(private ax: AxiosService) {
  }

  async search() {
    if (!this.fromDate || !this.toDate) {
      alert("Please select both from and to dates");
      return;
    }
    const fromFormattedDate = new Date(this.fromDate).toISOString().split('T')[0];
    const toFormattedDate = new Date(this.toDate).toISOString().split('T')[0];


    await this.fetchDailyReports(fromFormattedDate, toFormattedDate);
  }

  async fetchDailyReports(fromDate: string, toDate: string) {

    try {
      const response = await this.ax.request('GET', `/getWeeklyReportagent?fromDate=${fromDate}&toDate=${toDate}`, {}, {});
      this.weeklyReports = response.data;

      console.log(this.weeklyReports);
      this.totalAmount = this.weeklyReports.reduce((total, report) => total + report.totalAmount, 0);
    } catch (error) {
      console.error('Error fetching weekly reports:', error);
      alert('Failed to fetch weekly reports');
    }
  }
}
