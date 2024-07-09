import { ChangeDetectorRef, Component } from '@angular/core';
import { AxiosService } from '../../axios.service';
import { Router } from '@angular/router';
import Swal from "sweetalert2";

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


  loarddata1: any[] = [];
  filteredData1: any[] = [];
  loarddata: any[] = [];
  filteredData: any[] = [];

  // Pagination properties
  p1: number = 1;
  p2: number = 1;
  itemsPerPage: number = 10;
  searchSuggestions: string[] = [];

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



  submitData1() {
    if (!this.empid || !this.amount || !this.reson) {
      Swal.fire({
        title: 'Warning!',
        text: 'Please fill in all required fields.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;
    }

    this.axiosService.request('POST', 'addAdvance', {
      emp_id: this.empid,
      amount: this.amount,
      reson: this.reson,
      status: this.astatus,
    }, {})
      .then(response => {
        Swal.fire({
          title: 'Success!',
          text: 'Add advance successfully!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        this.resetForm();
      })
      .catch(error => {
        console.error('Error updating user details:', error);
        Swal.fire({
          title: 'Error!',
          text: error.response?.data?.message || 'An error occurred while updating user details. Please try again later.',
          icon: 'error',
          confirmButtonText: 'OK'
        });

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
        this.filteredData = response.data;
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  ngOnInit() {
    this.fetchAdvance();
    this.fetchLoan();
  }

  fetchAdvance() {
    this.axiosService.request('GET', '/getAdvance', null, {})
      .then(response => {
        this.loarddata1 = response.data;
        this.filteredData1 = response.data;
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }




  filterByEmployeeId() {
    this.applyFilters();
    this.updateSearchSuggestions();
  }


  applyFilters() {
    let filteredadvanceData = this.filteredData;
    let filteredloanData = this.filteredData1;

    if (this.employeeId) {
      const lowerCaseEmpId = this.employeeId.toLowerCase();
      filteredadvanceData = filteredadvanceData.filter(item => item.emp_id.toString().toLowerCase().includes(lowerCaseEmpId));
      filteredloanData = filteredloanData.filter(item => item.emp_id.toString().toLowerCase().includes(lowerCaseEmpId));
    }

    this.loarddata = filteredadvanceData;
    this.loarddata1 = filteredloanData;
  }

  updateSearchSuggestions() {
    if (this.employeeId) {
      const lowerCaseEmpId = this.employeeId.toLowerCase();
      this.searchSuggestions = this.filteredData
        .map(item => item.emp_id.toString())
        .filter(empId => empId.toLowerCase().includes(lowerCaseEmpId));
    } else {
      this.searchSuggestions = [];
    }
  }

  selectSuggestion(suggestion: string) {
    this.employeeId = suggestion;
    this.searchSuggestions = [];
    this.applyFilters();
  }

}
