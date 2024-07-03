import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AxiosService } from "../../axios.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-employee-leave',
  templateUrl: './employee-leave.component.html',
  styleUrls: ['./employee-leave.component.css']
})
export class EmployeeLeaveComponent implements OnInit {

  isVisible1: boolean = true;
  isVisible2: boolean = false;
  isVisible3: boolean = false;
  isVisible4: boolean = false;

  empid: any;
  stime: any;
  endtime: any;
  ltype: any;
  reason: any;
  astatus: any;

  employeeId: any;
  loarddata1: any[] = [];
  loarddata: any[] = [];
  filteredData: any[] = [];
  filteredData1: any[] = [];

  gempid: string = "";
  intime: string = '';
  outtime: string = '';
  date: any;
  greason: any;
  gstate: any;

  page: number = 1;
  selectedMonth: any;
  searchSuggestions: string[] = [];
  selectedMonth1: any;

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
    this.axiosService.request('GET', 'getLeave', null, {})
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
    if (!this.empid || !this.endtime || !this.ltype || !this.reason || !this.stime || !this.astatus) {
      alert('Please fill in all required fields.');
      return;
    }

    this.axiosService.request(
      "POST",
      "addLeave",
      {
        "end_time": this.endtime,
        "leave_type": this.ltype,
        "reson": this.reason,
        "start_time": this.stime,
        "status": this.astatus,
        "emp_id": this.empid
      }, {}).then(response => {
      console.log("Response from server:", response);
      alert("add leave successfully!");
    }).catch(error => {
      console.error("Error adding leave details:", error);
      alert("Error adding leave details. Please try again.");
    });

    this.empid = this.endtime = this.ltype = this.reason = this.stime = this.astatus = "";
  }

  submitData2() {
    if (!this.date || !this.intime || !this.outtime || !this.greason || !this.gstate || !this.gempid) {
      alert('Please fill in all required fields.');
      return;
    }

    this.axiosService.request(
      "POST",
      "addGatepass", {
        "date": this.date,
        "in_time": this.intime,
        "out_time": this.outtime,
        "reson": this.greason,
        "status": this.gstate,
        "emp_id": this.gempid,
      }, {}).then(response => {
      console.log("Response from server:", response);
      alert("add gatepass successfully!");
    }).catch(error => {
      console.error("Error adding gatepass details:", error);
      let errorMessage = "An error occurred while updating user details. Please try again later.";
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      alert(errorMessage);
    });

    this.date = this.intime = this.outtime = this.greason = this.gstate = this.gempid = "";
  }

  fetchgetepassdata() {
    this.axiosService.request('GET', 'getGatepass', null, {})
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

}
