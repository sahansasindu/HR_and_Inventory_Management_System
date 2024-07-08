import { Component } from '@angular/core';
import {AxiosService} from "../../../../axios.service";
import Swal from "sweetalert2";

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

      Swal.fire({
        icon: 'warning',
        title: 'Select Week',
        text: 'Please select a Week Duration..',
      });
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
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error fetching Weekly reports',
      });
    }
  }
}
