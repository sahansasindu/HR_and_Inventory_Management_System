import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {EmployeeMedical} from "../../model/employeeMedical";
import {AxiosService} from "../../axios.service";

@Component({
  selector: 'app-medical-approve',
  templateUrl: './medical-approve.component.html',
  styleUrl: './medical-approve.component.css'
})
export class MedicalApproveComponent implements OnInit{

  loarddata: any[] = [];
  loarddata1: any[] = [];

  employeeId: any;
  private axiosService: any;

  constructor(private employeeMedical:EmployeeMedical,private axios:AxiosService) {

  }

  async ngOnInit() {
    await this.MedicalDetails();
    this.fetchEmployeeData();
  }

  displayedColumns: string[] = ['employee_medical_id', 'emp_id','medical_report', 'submit_date', 'medical_status'];
  dataSource = new MatTableDataSource<EmployeeMedical>([]);
  selectedRow: EmployeeMedical | null = null;
  ELEMENT_DATA: EmployeeMedical[] = [

  ];

  selectRowmedicalPDF(row:EmployeeMedical) {
    this.selectedRow = row;
  }

  //get Employee medical
  medicalReportVisible: boolean = false;

  gotoReport() {

    if (!this.selectedRow) {
      alert("No row selected")
      return;
    }

      this.medicalReportVisible=!this.medicalReportVisible;
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
  fetchEmployeeData() {

    this.axiosService.request('GET', '/getEmployee', {}, {})
      .then((response: { data: any[]; }) => {
        this.loarddata1 = response.data;
        this.loarddata = response.data;

        console.log(this.loarddata); // Corrected logging statement
      })
      .catch((error: any) => {
        console.error('Error fetching data:', error);
      });
  }

  filterByEmpId() {
    if (this.employeeId === "") {
      this.fetchEmployeeData()
    } else {
      const lowerCaseEmpId = this.employeeId ? this.employeeId.toString().toLowerCase() : '';
      this.loarddata = this.loarddata1.filter(item => item.employeeid.toString().toLowerCase() === lowerCaseEmpId);
    }
  }
}
