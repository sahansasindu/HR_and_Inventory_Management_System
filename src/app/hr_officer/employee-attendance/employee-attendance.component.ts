import { ChangeDetectorRef, Component } from '@angular/core';
import { AxiosService } from "../../axios.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-employee-attendance',
  templateUrl: './employee-attendance.component.html',
  styleUrls: ['./employee-attendance.component.css']
})
export class EmployeeAttendanceComponent {
  isVisible1: boolean = true;
  isVisible2: boolean = false;
  loarddata: any[] = [];
  id: any;
  isLoading: boolean = false;
  intime: string = '';
  outtime: string = '';
  date: any;
  astate: any;
  eid: any;
  employeeId: string = '';
  filteredData: any[] = [];
  selectedMonth: string = '';
  page: number = 1; // <-- current page
  searchSuggestions: string[] = []; // <-- for storing search suggestions

  constructor(private axiosService: AxiosService, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.fetchAttendanceData();
  }

  show() {
    this.isVisible1 = true;
    this.isVisible2 = false;
  }

  show2() {
    this.isVisible1 = false;
    this.isVisible2 = true;
    this.fetchAttendanceData();
  }

  fetchAttendanceData() {
    this.axiosService.request('GET', 'getAttendance', null, {})
      .then(response => {
        this.loarddata = response.data;
        this.filteredData = response.data;
        this.applyFilters();
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
    if (!this.eid || !this.date || !this.intime || !this.outtime || !this.astate) {
      alert('Please fill in all required fields.');
      return;
    }

    this.axiosService.request(
      "POST",
      "/addAttendance",
      {
        "emp_id": this.eid,
        "date": this.date,
        "in_time": this.intime,
        "out_time": this.outtime,
        "attendance_status": this.astate,
      }, {}).then(response => {
      console.log("Response from server:", response);
      alert("User details updated successfully!");
    }).catch(error => {
      console.error("Error updating user details:", error);
      let errorMessage = "An error occurred while updating user details. Please try again later.";
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      alert(errorMessage);
    });

    this.eid = "";
    this.date = "";
    this.intime = "";
    this.outtime = "";
    this.astate = "";
  }

  filterByEmployeeId() {
    this.applyFilters();
    this.updateSearchSuggestions();
  }

  handleMonthChange() {
    if (this.selectedMonth) {
      this.applyFilters();
    }
  }

  applyFilters() {
    let filtered = this.filteredData;

    if (this.employeeId) {
      const lowerCaseEmpId = this.employeeId.toLowerCase();
      filtered = filtered.filter(item => item.emp_id.toString().toLowerCase().includes(lowerCaseEmpId));
    }

    if (this.selectedMonth) {
      const [year, month] = this.selectedMonth.split('-');
      const formattedMonth = `${year}-${month}`;
      filtered = filtered.filter(item => {
        const itemDate = new Date(item.date);
        const itemYear = itemDate.getFullYear();
        const itemMonth = itemDate.getMonth() + 1;
        const itemFormattedMonth = `${itemYear}-${itemMonth < 10 ? '0' + itemMonth : itemMonth}`;
        return itemFormattedMonth === formattedMonth;
      });
    }

    this.loarddata = filtered;
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
  getCountOfLoadData() {
    return this.loarddata.length;
  }
}
