import { Component } from '@angular/core';
import {AxiosService} from "../../../../axios.service";

@Component({
  selector: 'app-weekly-production-report',
  templateUrl: './weekly-production-report.component.html',
  styleUrl: './weekly-production-report.component.css'
})
export class WeeklyProductionReportComponent {

  fromDate: string = '';
  toDate: string = '';
  weeklymilkProductions: any[] = [];
  weeklymilkIssues: any[] = [];
  totalGoodMilkProductions: number = 0;
  totalBadMilkProductions: number = 0;
  totalIssues: number = 0;

  constructor(private ax: AxiosService) { }

  async search() {
    if (!this.fromDate || !this.toDate) {
      alert("Please select both from and to dates");
      return;
    }

    const fromFormattedDate = new Date(this.fromDate).toISOString().split('T')[0];
    const toFormattedDate = new Date(this.toDate).toISOString().split('T')[0];
    console.log('Searching from:', fromFormattedDate, 'to:', toFormattedDate);

    await this.fetchMilkProductions(fromFormattedDate, toFormattedDate);
    await this.fetchMilkIssues(fromFormattedDate, toFormattedDate);
  }

  async fetchMilkProductions(fromDate: string, toDate: string) {
    try {
      const response = await this.ax.request('GET', `/getProductionsByDateRange?fromDate=${fromDate}&toDate=${toDate}`, {}, {});
      this.weeklymilkProductions = response.data;
      console.log(this.weeklymilkProductions);

      this.totalGoodMilkProductions = this.weeklymilkProductions
        .filter(p => p.finishedState === 'Good')
        .reduce((total, p) => total + p.amount, 0);

      this.totalBadMilkProductions = this.weeklymilkProductions
        .filter(p => p.finishedState === 'Bad')
        .reduce((total, p) => total + p.amount, 0);
    } catch (error) {
      console.error('Error fetching weekly productions:', error);
      alert('Failed to fetch weekly productions');
    }
  }

  async fetchMilkIssues(fromDate: string, toDate: string) {
    try {
      const response = await this.ax.request('GET', `/getIssuesByDateRange?fromDate=${fromDate}&toDate=${toDate}`, {}, {});
      this.weeklymilkIssues = response.data;
      console.log(this.weeklymilkIssues);

      this.totalIssues = this.weeklymilkIssues.reduce((total, issue) => total + issue.numberOfBottles, 0);
    } catch (error) {
      console.error('Error fetching weekly issues:', error);
      alert('Failed to fetch weekly issues');
    }
  }
}
