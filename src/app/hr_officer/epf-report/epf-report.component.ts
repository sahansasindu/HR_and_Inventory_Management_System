import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-epf-report',
  templateUrl: './epf-report.component.html',
  styleUrls: ['./epf-report.component.css']
})
export class EPFReportComponent {
  @Input() etfreport: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log('Received salaryReport:', this.etfreport);
    });

    console.log('etfreport:', this.etfreport);  // Log the etfreport data
  }

  downloadPDF() {
    const element = document.getElementById('salary-report-content');
    html2canvas(element!).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('salary-report.pdf');
    });
  }
}
