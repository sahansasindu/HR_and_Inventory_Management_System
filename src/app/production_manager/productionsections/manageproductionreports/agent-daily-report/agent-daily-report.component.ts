import {Component} from '@angular/core';
import {AxiosService} from "../../../../axios.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-agent-daily-report',
  templateUrl: './agent-daily-report.component.html',
  styleUrl: './agent-daily-report.component.css'
})
export class AgentDailyReportComponent{

  selectedDate: string = '';
  dailyReports: any[] = [];
  totalAmount: number = 0;

  constructor(private ax: AxiosService) { }

  async search() {
    if (!this.selectedDate) {
      Swal.fire({
        icon: 'warning',
        title: 'Select Date',
        text: 'Please select a date',
      });
      return;
    }

    const formDate = new Date(this.selectedDate);
    const formattedDate = formDate.toISOString().split('T')[0];

    await this.fetchDailyReports(formattedDate);
  }

  async fetchDailyReports(date: string) {
    try {
      const response = await this.ax.request('GET', `/getDailyReportagent?date=${date}`, {}, {});
      this.dailyReports = response.data;

      console.log(this.dailyReports);
      this.totalAmount = this.dailyReports.reduce((total, report) => total + report.totalAmount, 0);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error fetching daily reports',
      });
    }
  }
}
