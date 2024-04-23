import { Component, ElementRef, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { PLATFORM_ID, Inject } from '@angular/core';

@Component({
  selector: 'app-manageproductionreports',
  templateUrl: './manageproductionreports.component.html',
  styleUrls: ['./manageproductionreports.component.css']
})
export class ManageproductionreportsComponent {

  @ViewChild('dailyReportContent') dailyReportContent!: ElementRef;

 // isPdfGenerated: boolean = false;
  isAgentReport: boolean = false;
  labelValue: string='';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.labelValue="Got To Agent Reports";
  }

 /* generatePdf() {
    if (!isPlatformBrowser(this.platformId)) {
      console.error('Document is not defined. Cannot generate PDF.');
      return;
    }

    console.log('Generating PDF...');
    if (this.dailyReportContent) {
      const dailyReportElement = this.dailyReportContent.nativeElement;
      html2canvas(dailyReportElement).then(canvas => {
        const contentDataURL = canvas.toDataURL('image/png');
        let pdf = new jsPDF('l', 'px', 'a4');
        const imgWidth = 210;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        pdf.addImage(contentDataURL, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save('daily-report.pdf');
        this.isPdfGenerated = true;
      });
    } else {
      console.error('dailyReportContent not found');
    }
  }*/

  swapMatCart() {
    this.isAgentReport=!this.isAgentReport;
    if(this.isAgentReport){
      this.labelValue="Back To Production Reports";
    }else {
      this.labelValue="Got To Agent Reports";
    }
  }
}
