import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {EmployeeMedical} from "../../model/employeeMedical";
import {AxiosService} from "../../axios.service";
import {DatePipe} from "@angular/common";


@Component({
  selector: 'app-medical-approve',
  templateUrl: './medical-approve.component.html',
  styleUrl: './medical-approve.component.css',
  providers: [DatePipe]
})
export class MedicalApproveComponent implements OnInit{


  selectedRow: EmployeeMedical | null = null;
  formattedDate!: string | null;
  medicalHistoryVisible: boolean=false;
  medicalHistorySummary: MedicalHistorySummaryDto | null = null;

  constructor(private axios:AxiosService,private datePipe: DatePipe) {

  }

  async ngOnInit() {

    this.dataSource.filterPredicate = (data: EmployeeMedical, filter: string) => {
      return data.emp_id.toLowerCase().includes(filter);
    };
    await this.MedicalDetails();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  displayedColumns: string[] = ['employee_medical_id', 'emp_id','medical_report', 'submit_date', 'medical_status'];
  dataSource = new MatTableDataSource<EmployeeMedical>([]);
  ELEMENT_DATA: EmployeeMedical[] = [

  ];

  selectRowmedicalPDF(row:EmployeeMedical) {

    if (this.selectedRow === row) {
      this.selectedRow = null;
    } else {
      this.selectedRow = row;
    }
  }

  //get Employee medical
  medicalReportVisible: boolean = false;

  gotoReport() {

    this.formattedDate = this.datePipe.transform(this.selectedRow?.submit_date, 'MMM d, yyyy');

    if (!this.selectedRow) {
      alert("Please Check Medical Report First....")
      return;
    }

      this.medicalReportVisible=!this.medicalReportVisible;

    if(!this.medicalReportVisible){
      this.selectedRow=null;
    }
  }

   async MedicalDetails():Promise<void> {
    try {
      const response = await this.axios.request('GET', '/getMedicalData', {}, {});
      this.dataSource.data = response.data;
      this.ELEMENT_DATA = this.dataSource.data;
      console.log('Medical Details fetched successfully:', response.data);
    } catch (error) {
      console.error('Error fetching Medical Details:', error);
    }

  }
  async downloadMedicalReport(id: number): Promise<void> {
    try {
      const response = await this.axios.request2('GET', `/downloadMedicalReport/${id}`, {}, { responseType: 'blob' });

      const contentType = response.headers['content-type'];
      let fileExtension = 'jpg';

      if (contentType === 'image/png') {
        fileExtension = 'png';
      } else if (contentType === 'image/jpeg') {
        fileExtension = 'jpeg';
      } else if (contentType === 'image/gif') {
        fileExtension = 'gif';
      }

      const url = window.URL.createObjectURL(new Blob([response.data], { type: contentType }));
      const a = document.createElement('a');
      a.href = url;
      a.download = `medical_report_${id}.${fileExtension}`;
      a.click();
    } catch (error) {
      console.error('Error downloading Medical Report:', error);
    }
  }
  async viewMedicaleHistory() {

    const empId=(document.getElementById('emp_id') as HTMLInputElement).value;
    try {
      const response = await this.axios.request('GET', `/getMedicalHistorySummary?empId=${empId}`, {}, {});
      this.medicalHistorySummary = response.data;
      this.medicalHistoryVisible = true;
      console.log('Medical History Summary:', this.medicalHistorySummary);
    } catch (error) {
      console.error('Error fetching Medical History Summary:', error);
    }


  }
  closeMedicalReport() {

    this.medicalHistoryVisible = false;

  }
  async updateMedicalStatus(status: string) {

    if (this.selectedRow) {
      const confirmUpdate = window.confirm(`Are you sure you want to ${status} this Medical request?`);
      if (confirmUpdate) {
        await this.saveStatusUpdate(this.selectedRow.employee_medical_id, status);
      }
    }
  }

  async saveStatusUpdate(employee_medical_id: number, status: string): Promise<void> {
    try {
      await this.axios.request('PUT', `/updateMedicalStatus?employee_medical_id=${employee_medical_id}&status=${status}`,{},{});
      alert('Medical status updated successfully.....');
      await this.MedicalDetails(); // Refresh leave details after update
    } catch (error) {
      console.error('Error updating Medical Status:', error);
      alert('Error updating Medical Status:');
    }
  }

}
export interface MedicalHistorySummaryDto{

  approvedCount: number;
  rejectedCount: number;
  empId: string;
  employeeName: string;
  jobRole: string;

}
