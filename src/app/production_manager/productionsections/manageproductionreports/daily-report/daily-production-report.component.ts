import { Component } from '@angular/core';
import {AxiosService} from "../../../../axios.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-daily-production-report',
  templateUrl: './daily-production-report.component.html',
  styleUrl: './daily-production-report.component.css'
})
export class DailyProductionReportComponent {

  selectedDate: string = '';

  dailymilkProductions: any[] = [];
  dailymilkIssues: any[] = [];
  totalGoodMilkProductions: number = 0;
  totalBadMilkProductions: number = 0;
  totalIssues: number = 0;

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

    const formattedDate = new Date(this.selectedDate).toISOString().split('T')[0];
    console.log('Searching for:', formattedDate);

    await this.fetchMilkProductions(formattedDate);
    await this.fetchMilkIssues(formattedDate);
  }

  async fetchMilkProductions(date: string) {
    try {
      const response = await this.ax.request('GET', `/getDailyProductions?date=${date}`, {}, {});
      this.dailymilkProductions = response.data;
      console.log(this.dailymilkProductions)

      this.totalGoodMilkProductions = this.dailymilkProductions
        .filter(p => p.finishedState === 'Good')
        .reduce((total, p) => total + p.amount, 0);

      this.totalBadMilkProductions = this.dailymilkProductions
        .filter(p => p.finishedState === 'Bad')
        .reduce((total, p) => total + p.amount, 0);
    } catch (error) {

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error fetching daily productions',
      });
    }
  }

  async fetchMilkIssues(date: string) {
    try {
      const response = await this.ax.request('GET', `/getDailyIssues?date=${date}`, {}, {});
      this.dailymilkIssues = response.data;
      console.log(this.dailymilkIssues)
      this.totalIssues = this.dailymilkIssues.reduce((total, issue) => total + issue.numberOfBottles, 0);
    } catch (error) {

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error fetching daily issues',
      });
    }
  }
}
