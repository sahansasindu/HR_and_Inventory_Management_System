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

  eid: string = '';
  sdate: string = '';
  mstate: string = '';
  report: File | null = null;

  handleFileInput(event: any) {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      this.report = files[0];
    }
  }

  submitData() {

    const emp_id = (<HTMLInputElement>document.getElementById('empId')).value;
    const formDate =new Date((<HTMLInputElement>document.getElementById('submitDate')).value) ;
    const medical_status = (<HTMLSelectElement>document.getElementById('medicalStatus')).value;
    const medical_report = (<HTMLInputElement>document.getElementById('medicalReport')).files?.[0];

    const submit_date = formDate.toISOString().split('T')[0];



    if (medical_report) {
      const formData = new FormData();
      formData.append('emp_id', emp_id);
      formData.append('submit_date', submit_date);
      formData.append('medical_status', medical_status);
      formData.append('medical_report', medical_report);
      this.axiosService
        .request('POST', '/addMedical', formData,{
          headers: {
            'Content-Type': 'multipart/form-data'
          }})
        .then(response => {
          if (response.data && response.data.message) {
            alert(response.data.message);
          } else {
            alert('Medical record added successfully!');
          }
        })
        .catch(error => {
          if (error.response && error.response.data && error.response.data.message) {
            alert(error.response.data.message);
          } else {
            alert('An error occurred while adding the medical record.');
          }
        });
    }else {
      alert('Please select a medical report!')
    }

  }

  filterByDepartment() {
    console.log(this.selectedDepartment);
    if (this.selectedDepartment == 'All') {
      this.fetchDeductionData();
    } else {
      this.loandata = this.salaryheader2;
      this.salaryheader = this.loandata.filter(
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
    this.axiosService.request('GET', '/getmedical', null,{})
      .then(response => {
        this.salaryheader2 = response.data;
        this.loandata = response.data;
        this.isLoading = false;
        console.log(this.loandata);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
}
