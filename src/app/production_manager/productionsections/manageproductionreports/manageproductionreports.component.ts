import { Component, ElementRef, ViewChild } from '@angular/core';
import { PLATFORM_ID, Inject } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-manageproductionreports',
  templateUrl: './manageproductionreports.component.html',
  styleUrls: ['./manageproductionreports.component.css']
})
export class ManageproductionreportsComponent {

  @ViewChild('dailyReportContent', { static: false }) dailyReportContent!: ElementRef;
  @ViewChild('weeklyReportContent', { static: false }) weeklyReportContent!: ElementRef;
  @ViewChild('monthlyReportContent', { static: false }) monthlyReportContent!: ElementRef;
  @ViewChild('agentDailyReportContent', { static: false }) agentDailyReportContent!: ElementRef;
  @ViewChild('agentWeeklyReportContent', { static: false }) agentWeeklyReportContent!: ElementRef;
  @ViewChild('agentMonthlyReportContent', { static: false }) agentMonthlyReportContent!: ElementRef;

  isAgentReport: boolean = false;
  labelValue: string='';
  selectedIndex: number = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.labelValue="Got To Agent Reports";
  }


  swapMatCart() {
    this.isAgentReport=!this.isAgentReport;
    if(this.isAgentReport){
      this.labelValue="Back To Production Reports";
    }else {
      this.labelValue="Got To Agent Reports";
    }
  }

  onTabChange(index: number) {
    this.selectedIndex = index;
  }


  getSelectedTab(): string {
    switch (this.selectedIndex) {
      case 0: return 'Daily';
      case 1: return 'Weekly';
      case 2: return 'Monthly';
      default: return 'Daily';
    }
  }

  downloadAsPDF() {

    let DATA: HTMLElement;

    if (this.isAgentReport) {
      const selectedTab = this.getSelectedTab();
      if (selectedTab === 'Daily') {
        DATA = this.agentDailyReportContent.nativeElement;
      } else if (selectedTab === 'Weekly') {
        DATA = this.agentWeeklyReportContent.nativeElement;
      } else {
        DATA = this.agentMonthlyReportContent.nativeElement;
      }
    } else {
      const selectedTab = this.getSelectedTab();
      if (selectedTab === 'Daily') {
        DATA = this.dailyReportContent.nativeElement;
      } else if (selectedTab === 'Weekly') {
        DATA = this.weeklyReportContent.nativeElement;
      } else {
        DATA = this.monthlyReportContent.nativeElement;
      }
    }

    this.addHideForPDFClass(DATA);

    html2canvas(DATA).then(canvas => {
      const fileWidth = 208;
      const fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      const PDF = new jsPDF('p', 'mm', 'a4');
      const position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('report.pdf');

      this.removeHideForPDFClass(DATA);
    });
  }

  addHideForPDFClass(element: HTMLElement) {
    const elementsToHide = element.querySelectorAll('.date-search-container, .search-button');
    elementsToHide.forEach(el => el.classList.add('hide-for-pdf'));
  }

  removeHideForPDFClass(element: HTMLElement) {
    const elementsToHide = element.querySelectorAll('.date-search-container, .search-button');
    elementsToHide.forEach(el => el.classList.remove('hide-for-pdf'));
  }
}
