import { Component } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-daily-production-report',
  templateUrl: './daily-production-report.component.html',
  styleUrl: './daily-production-report.component.css'
})
export class DailyProductionReportComponent {
  selectedDate: string='';

  milkProductions: any[] = [];
  milkIssues: any[] = [];
  totalGoodMilkProductions: number = 0;
  totalBadMilkProductions: number = 0;
  totalIssues: number = 0;


  constructor() { }

  search() {
    if (!this.selectedDate) {
      alert("Please select a date");
      return;

    }
      this.fetchMilkProductions(this.selectedDate);
      this.fetchMilkIssues(this.selectedDate);
    }

    fetchMilkProductions(fromDate: string) {

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

    fetchMilkIssues(fromDate: string) {

      this.milkIssues = [
        { numberOfBottles: 20, issueType: 'Leakage' },
        { numberOfBottles: 10, issueType: 'Spoilage' }
      ];

      this.totalIssues = this.milkIssues.reduce((total, issue) => total + issue.numberOfBottles, 0);
    }
}



