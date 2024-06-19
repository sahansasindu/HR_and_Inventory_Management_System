import {ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import { AxiosService } from '../../axios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-medical',
  templateUrl: './add-medical.component.html',
  styleUrls: ['./add-medical.component.css']
})
export class AddMedicalComponent {
  isVisible1: boolean = true;
  isVisible2: boolean = false;

  loandata: any[] = [];
  salaryheader: any[] = [];
  salaryheader2: any[] = [];
  selectedDepartment: string = '';
  isLoading: boolean = false;

  sdate: string = '';
  mstate: string = '';
  report: File | null = null;
  eid: any;
  employeeId: any;


  medicalData = {
    empId: '',
    submitDate: '',
    medicalStatus: '',
    medicalReport: null
  };

  @ViewChild('fileInput') fileInput!: ElementRef;


  constructor(
    private axiosService: AxiosService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  handleFileInput(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.medicalData.medicalReport = file;
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
    const headers = {
      'Authorization': `Bearer ${this.getAuthToken()}` // Adjust to your token retrieval method
    };


    const formData = new FormData();
    formData.append('emp_id', this.medicalData.empId);
    formData.append('submit_date', this.medicalData.submitDate);
    formData.append('medical_status', this.medicalData.medicalStatus);
    if (this.medicalData.medicalReport) {
      formData.append('medical_report', this.medicalData.medicalReport);
    }

    if(formData){
      alert("Please Fill All The Fields....")
    }

    try {
      const response = await this.axiosService.request('POST', 'addMedical', formData, { headers });
      console.log('Data submitted successfully', response);
      await this.router.navigate(['/success']);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  }

  getAuthToken() {
    // Method to retrieve the auth token
    return localStorage.getItem('authToken') || ''; // Example: Retrieving token from localStorage
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

  ngOnInit() {
    this.fetchDeductionData();
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
