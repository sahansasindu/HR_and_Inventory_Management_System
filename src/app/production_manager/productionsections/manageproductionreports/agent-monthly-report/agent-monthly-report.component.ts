import { Component } from '@angular/core';
import {AxiosService} from "../../../../axios.service";

@Component({
  selector: 'app-agent-monthly-report',
  templateUrl: './agent-monthly-report.component.html',
  styleUrl: './agent-monthly-report.component.css'
})
export class AgentMonthlyReportComponent {

  fromMonth: string = '';
  MonthlyReports: any[] = [];
  totalAmount: number = 0;

  constructor(private ax: AxiosService) { }

  async search() {
    if (!this.fromMonth) {
      alert("Please select month");
      return;
    }

    const [year, month] = this.fromMonth.split('-').map(Number);

    await this.fetchMonthlyReports(month, year);
  }

  async fetchMonthlyReports(month: number, year: number) {
    try {
      const response = await this.ax.request('GET', `getMonthlyReportagent?month=${month}&year=${year}`, {}, {});
      this.MonthlyReports = response.data;

      console.log(this.MonthlyReports);
      this.totalAmount = this.MonthlyReports.reduce((total, report) => total + report.totalAmount, 0);
    } catch (error) {
      console.error('Error fetching monthly reports:', error);
      alert('Failed to fetch monthly reports');
    }
  }
}
