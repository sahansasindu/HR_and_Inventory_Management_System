import {Component, OnInit} from '@angular/core';
import { AxiosService } from '../../axios.service';


@Component({
  selector: 'app-add-medical',
  templateUrl: './add-medical.component.html',
  styleUrls: ['./add-medical.component.css']
})
export class AddMedicalComponent implements OnInit{
  isVisible1: boolean = true;
  isVisible2: boolean = false;

  loandata: any[] = [];
  salaryheader: any[] = [];
  salaryheader2: any[] = [];
  selectedDepartment: string = '';
  isLoading: boolean = false;


  report: File | null = null;
  employeeId: any;

  ngOnInit() {
    this.fetchDeductionData();
  }

  employeeMedical:EmployeeMedical=new EmployeeMedical("","","",null);

  constructor(private axiosService: AxiosService,) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.employeeMedical.medical_report = input.files[0];
    }
  }

  show() {
    this.isVisible1 = true;
    this.isVisible2 = false;
  }

  show2() {
    this.isVisible1 = false;
    this.isVisible2 = true;
  }


  async submitData() {
    const formData = new FormData();

    formData.append('emp_id', this.employeeMedical.emp_id);
    formData.append('submit_date', new Date(this.employeeMedical.submit_date).toISOString().split('T')[0]);
    formData.append('medical_status', this.employeeMedical.medical_status);

    if (this.employeeMedical.medical_report) {
      formData.append('medical_report', this.employeeMedical.medical_report);
    }

    try {
      const response = await this.axiosService.request('POST', '/addMedical', formData, {'Content-Type': 'multipart/form-data'});
      if (response.data) {
        alert('Medical data added successfully!');
      }
    } catch (error: any) {
      if (this.axiosService.isAxiosError(error)) {
        const errorResponse = error.response?.data as ErrorResponse;
        if (errorResponse && errorResponse.message) {
          alert("Error submitting medical data: " + errorResponse.message);
        } else {
          alert("Error submitting medical data");
        }
      } else {
        alert("An unexpected error occurred");
      }
      console.error('Error submitting medical data:', error);
    }
  }


  filterByDepartment() {
    if (this.selectedDepartment === 'All') {
      this.fetchDeductionData();
    } else {
      this.salaryheader = this.salaryheader2.filter(
        item => item.department_name === this.selectedDepartment
      );
      this.loandata = this.salaryheader;
    }
  }



  fetchDeductionData() {
    this.isLoading = true;
    this.axiosService.request('GET', '/getmedical', null)
      .then(response => {
        this.salaryheader2 = response.data;
        this.loandata = response.data;
        this.isLoading = false;
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        this.isLoading = false;
      });
  }

  filterByEmployeeId() {
    // Implementation for filtering by employee ID
  }
}

export class EmployeeMedical{

  constructor(public emp_id:string,
              public medical_status:string,
              public submit_date:string,
              public medical_report:File | null) {
  }
}
interface ErrorResponse {
  message: string;
}
