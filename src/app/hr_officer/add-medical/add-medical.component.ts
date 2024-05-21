import { ChangeDetectorRef, Component } from '@angular/core';
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

  constructor(
    private axiosService: AxiosService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  show() {
    this.isVisible1 = true;
    this.isVisible2 = false;
  }

  show2() {
    this.isVisible1 = false;
    this.isVisible2 = true;
  }

  handleFileInput(event: any) {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      this.report = files[0];
    }
  }

  submitData() {
    const formData = new FormData();
    formData.append('emp_id', this.eid);
    formData.append('submit_date', this.sdate);
    formData.append('medical_status', this.mstate);
    if (this.report) {
      formData.append('medical_report', this.report);
    }

    const headers = {
      'Authorization': `Bearer ${this.getAuthToken()}` // Assuming you have a method to get the auth token
    };

    this.axiosService.request('POST', 'addMedical', formData, { headers })
      .then(response => {
        // Handle success response
        console.log('Data submitted successfully', response);
        this.router.navigate(['/success']); // Navigate to success page or any other desired page
      })
      .catch(error => {
        console.error('Error submitting data:', error);
      });
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
