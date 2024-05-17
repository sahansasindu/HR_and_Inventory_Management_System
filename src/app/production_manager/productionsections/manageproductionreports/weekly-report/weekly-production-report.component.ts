import { Component } from '@angular/core';

@Component({
  selector: 'app-weekly-production-report',
  templateUrl: './weekly-production-report.component.html',
  styleUrl: './weekly-production-report.component.css'
})
export class WeeklyProductionReportComponent {

  fromDate: string = '';
  toDate: string = '';
  milkProductions: any[] = [];
  milkIssues: any[] = [];
  totalGoodMilkProductions: number = 0;
  totalBadMilkProductions: number = 0;
  totalIssues: number = 0;

  constructor() { }

  search() {
    if (!this.fromDate || !this.toDate) {
      alert("Please select both from and to dates");
      return;
    }

    const fromFormattedDate = new Date(this.fromDate).toISOString().split('T')[0];
    const toFormattedDate = new Date(this.toDate).toISOString().split('T')[0];
    console.log('Searching from:', fromFormattedDate, 'to:', toFormattedDate);


    this.fetchMilkProductions(fromFormattedDate, toFormattedDate);
    this.fetchMilkIssues(fromFormattedDate, toFormattedDate);
  }

  fetchMilkProductions(fromDate: string, toDate: string) {

    this.milkProductions = [
      { amount: 100, batchCode: 'A001', finishedState: 'Good' },
      { amount: 50, batchCode: 'A002', finishedState: 'Bad' }
    ];

    this.totalGoodMilkProductions = this.milkProductions
      .filter(p => p.finishedState === 'Good')
      .reduce((total, p) => total + p.amount, 0);

    this.totalBadMilkProductions = this.milkProductions
      .filter(p => p.finishedState === 'Bad')
      .reduce((total, p) => total + p.amount, 0);
  }

  fetchMilkIssues(fromDate: string, toDate: string) {

    this.milkIssues = [
      { numberOfBottles: 20, issueType: 'Leakage' },
      { numberOfBottles: 10, issueType: 'Spoilage' }
    ];

    this.totalIssues = this.milkIssues.reduce((total, issue) => total + issue.numberOfBottles, 0);
  }
}
