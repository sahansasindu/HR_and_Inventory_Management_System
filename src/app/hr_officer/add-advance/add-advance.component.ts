import { ChangeDetectorRef, Component } from '@angular/core';
import { AxiosService } from '../../axios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-advance',
  templateUrl: './add-advance.component.html',
  styleUrls: ['./add-advance.component.css']
})
export class AddAdvanceComponent {
  isVisible1: boolean = true;
  isVisible2: boolean = false;
  isVisible3: boolean = false;

  empid: string = '';
  amount: any;
  reson: any;
  astatus: any;

  employeeId: any;

  filteredData: any[] = [];
  loarddata1: any[] = [];
  filteredData2: any[] = [];
  loarddata: any[] = [];

  // Pagination properties
  p1: number = 1;
  p2: number = 1;
  itemsPerPage: number = 10;

  show() {
    this.isVisible1 = true;
    this.isVisible2 = false;
    this.isVisible3 = false;
    this.employeeId = '';
  }

  show2() {
    this.isVisible1 = false;
    this.isVisible2 = true;
    this.isVisible3 = false;
    this.fetchAdvance();
    this.employeeId = '';
  }

  show3() {
    this.isVisible1 = false;
    this.isVisible2 = false;
    this.isVisible3 = true;
    this.fetchLoan();
    this.employeeId = '';
  }

  constructor(private axiosService: AxiosService, private router: Router, private cdr: ChangeDetectorRef) {}

  filterByEmployeeId() {
    if (this.employeeId === '') {
      this.fetchAdvance();
      this.fetchLoan();
    } else {
      const lowerCaseEmpId = this.employeeId.toString().toLowerCase();
      this.loarddata1 = this.filteredData.filter(item => item.emp_id.toString().toLowerCase() === lowerCaseEmpId);
      this.loarddata = this.filteredData2.filter(item => item.emp_id.toString().toLowerCase() === lowerCaseEmpId);
    }
  }

  ngOnInit() {
    this.fetchAdvance();
    this.fetchLoan();
  }

  fetchAdvance() {
    this.axiosService.request('GET', '/getAdvance', null, {})
      .then(response => {
        this.loarddata1 = response.data;
        this.filteredData = response.data;
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  submitData1() {
    if (!this.empid || !this.amount || !this.reson) {
      alert('Please fill in all required fields.');
      return;
    }

    this.axiosService.request('POST', 'addAdvance', {
      emp_id: this.empid,
      amount: this.amount,
      reson: this.reson,
      status: this.astatus,
    }, {})
      .then(response => {
        alert('Add advance successfully!');
        this.resetForm();
      })
      .catch(error => {
        console.error('Error updating user details:', error);
        alert(error.response?.data?.message || 'An error occurred while updating user details. Please try again later.');
      });
  }

  resetForm() {
    this.empid = '';
    this.amount = '';
    this.reson = '';
    this.astatus = '';
  }

  fetchLoan() {
    this.axiosService.request('GET', '/getLoan', null, {})
      .then(response => {
        this.loarddata = response.data;
        this.filteredData2 = response.data;
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
}
