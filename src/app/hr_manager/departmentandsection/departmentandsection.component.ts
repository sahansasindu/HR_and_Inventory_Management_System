import {ChangeDetectorRef, Component} from '@angular/core';
import {AxiosService} from "../../axios.service";
import {Router} from "@angular/router";
import Swal from 'sweetalert2';

@Component({
  selector: 'departmentandsection',
  templateUrl: './departmentandsection.component.html',
  styleUrls: ['./departmentandsection.component.css']
})
export class DepartmentandsectionComponent {

  isVisible1: boolean = true;
  isVisible2: boolean = false;
  isVisible3: boolean = false;
  isVisible4: boolean = false;

  empid: any;
  reason: any;
  employeeId: any;
  loarddata1: any[] = [];
  loarddata: any[] = [];
  filteredData: any[] = [];
  filteredData1: any[] = [];

  intime: string = '';
  outtime: string = '';
  date: any;

  page: number = 1;
  selectedMonth: any;
  searchSuggestions: string[] = [];
  selectedMonth1: any;

  secname: any;
  secid: any;
  sdate: any;
  depid: any;
  depname: any;

  constructor(private axiosService: AxiosService, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.fetchLeaveData();
  }

  show() {
    this.isVisible1 = true;
    this.isVisible2 = false;
    this.isVisible3 = false;
    this.isVisible4 = false;
    this.employeeId = "";
  }

  show2() {
    this.isVisible1 = false;
    this.isVisible2 = true;
    this.isVisible3 = false;
    this.isVisible4 = false;
    this.employeeId = "";
  }

  show3() {
    this.isVisible1 = false;
    this.isVisible2 = false;
    this.isVisible3 = true;
    this.isVisible4 = false;
    this.employeeId = "";
    this.fetchLeaveData();
  }

  show4() {
    this.isVisible1 = false;
    this.isVisible2 = false;
    this.isVisible3 = false;
    this.isVisible4 = true;
    this.fetchgetepassdata();
    this.employeeId = "";
  }

  fetchLeaveData() {
    this.axiosService.request('GET', 'getDepartment1', null, {})
      .then(response => {
        this.loarddata = response.data;
        this.filteredData = response.data;
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  onTimeChange(type: 'in' | 'out', newTime: string) {
    const date = new Date();
    const timeParts = newTime.split(':');
    date.setHours(parseInt(timeParts[0], 10));
    date.setMinutes(parseInt(timeParts[1], 10));
    date.setSeconds(0);
    const formattedTime = date.toTimeString().slice(0, 8);

    if (type === 'in') {
      this.intime = formattedTime;
    } else if (type === 'out') {
      this.outtime = formattedTime;
    }
  }

  submitData() {
    if (!this.depid || !this.depname || !this.sdate) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please fill in all required fields.'
      });
      return;
    }

    this.axiosService.request(
      "POST",
      "addDepartment",
      {
        "department_id": this.depid,
        "department_name": this.depname,
        "start_date": this.sdate,
      }, {}).then(response => {
      console.log("Response from server:", response);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Department added successfully!'
      });
    }).catch(error => {
      console.error("Error adding department details:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error adding department details. Please try again.'
      });
    });

    this.empid = this.depid = this.secname = this.sdate = "";
  }

  submitData2() {
    if (!this.secid || !this.secname || !this.sdate || !this.depid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please fill in all required fields.'
      });
      return;
    }

    this.axiosService.request(
      "POST",
      "addSection", {
        "section_id": this.secid,
        "section_name": this.secname,
        "start_date": this.sdate,
        "dep_id": this.depid,
      }, {}).then(response => {
      console.log("Response from server:", response);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Section added successfully!'
      });
    }).catch(error => {
      console.error("Error adding section details:", error);
      let errorMessage = "An error occurred while updating section details. Please try again later.";
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage
      });
    });

    this.secid = this.secname = this.sdate = this.depid = "";
  }

  fetchgetepassdata() {
    this.axiosService.request('GET', 'getSection', null, {})
      .then(response => {
        this.loarddata1 = response.data;
        this.filteredData1 = response.data;
        console.log(this.loarddata1);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  filterByEmployeeId() {
    this.applyFilters();
    this.updateSearchSuggestions();
  }

  handleMonthChange() {
    if (this.selectedMonth || this.selectedMonth1) {
      this.applyFilters();
    }
  }

  applyFilters() {
    let filteredLeaveData = this.filteredData;
    let filteredGatepassData = this.filteredData1;

    if (this.employeeId) {
      const lowerCaseEmpId = this.employeeId.toLowerCase();
      filteredLeaveData = filteredLeaveData.filter(item => item.emp_id.toString().toLowerCase().includes(lowerCaseEmpId));
      filteredGatepassData = filteredGatepassData.filter(item => item.emp_id.toString().toLowerCase().includes(lowerCaseEmpId));
    }

    if (this.selectedMonth) {
      const [year, month] = this.selectedMonth.split('-');
      filteredGatepassData = filteredGatepassData.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate.getFullYear() === parseInt(year) && (itemDate.getMonth() + 1) === parseInt(month);
      });
    }

    if (this.selectedMonth1) {
      const [year, month] = this.selectedMonth1.split('-');
      filteredLeaveData = filteredLeaveData.filter(item => {
        const itemDate = new Date(item.start_time);
        return itemDate.getFullYear() === parseInt(year) && (itemDate.getMonth() + 1) === parseInt(month);
      });
    }

    this.loarddata = filteredLeaveData;
    this.loarddata1 = filteredGatepassData;
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

  pageChanged(event: number) {
    this.page = event;
  }

  Update(basic_salary_id: any) {

  }
}
