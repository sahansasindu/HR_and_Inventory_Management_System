import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-salary-report',
  templateUrl: './salary-report.component.html',
  styleUrls: ['./salary-report.component.css']
})
export class SalaryReportComponent implements OnInit {
  @Input() salaryReport: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log("Received salaryReport:", this.salaryReport);
    });
  }

  downloadPDF() {
    const element = document.getElementById('salary-report-content');
    html2canvas(element!).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps= pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('salary-report.pdf');

      // Clear the form data
      this.clearFormData();
    });
  }


  clearFormData() {
    this.salaryReport = null; // Clear the salaryReport data

  }

  show() {
    // Reset any visibility or state variables here as needed
    // For example, if you are using Angular services to manage state, you can reset the relevant variables
    // If you are using component-level state management, reset the component's variables here
  }
}
