import {ChangeDetectorRef, Component} from '@angular/core';
import {AxiosService} from "../../axios.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-employee-attendance',
  templateUrl: './employee-attendance.component.html',
  styleUrl: './employee-attendance.component.css'
})
export class EmployeeAttendanceComponent {
  isVisible1: boolean = true;
  isVisible2: boolean = false;


  show() {
    this.isVisible1 = true;
    this.isVisible2 = false;


  }

  show2() {
    this.isVisible1 = false;
    this.isVisible2 = true;

  }


  loandata: any[] = [];
  id: any;


  salaryheader: any[] = [];
  salaryheader2: any[] = [];
  selectedDepartment: string = "";
  isLoading: boolean = false;
  intime: string = ''; // Initialize intime as a string
  outtime: string = ''; // Initialize outtime as a string
  date: any;
  astate: any;
  eid: any;
  employeeId: any;
  filteredData: any[] = [];
  sa: any[]=[];
  selectedDate: any;



  constructor(private axiosService: AxiosService, private router: Router, private cdr: ChangeDetectorRef) {
  }



  ngOnInit() {
    this.fetchAttendanceData();
  }

  fetchAttendanceData() {
    this.axiosService.request('GET', 'getAttendance', null, {})
      .then(response => {
        this.loandata = response.data;
        this.filteredData = response.data;
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
  onTimeChange(type: 'in' | 'out', newTime: string) {
    const date = new Date();
    const timeParts = newTime.split(':'); // Split the time into hours and minutes
    date.setHours(parseInt(timeParts[0], 10)); // Set the hours part
    date.setMinutes(parseInt(timeParts[1], 10)); // Set the minutes part
    date.setSeconds(0); // Set seconds to 0
    const formattedTime = date.toTimeString().slice(0, 8); // Format as HH:mm:ss

    if (type === 'in') {
      this.intime = formattedTime; // Set the formatted time for In Time
    } else if (type === 'out') {
      this.outtime = formattedTime; // Set the formatted time for Out Time
    }
  }


  submitData() {
    console.log(this.date)
    this.axiosService.request(
      "POST",
      "/addAttendance",
      {
        "emp_id": this.eid,
        "date": this.date,
       "in_time": this.intime,
        "out_time": this.outtime,
        "attendance_status": this.astate,
      }
    ,{}).then(response => {
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
  }

  filterByEmployeeId() {
    if (this.employeeId === "") {
      this.fetchAttendanceData();
    } else {
      const lowerCaseEmpId = this.employeeId ? this.employeeId.toString().toLowerCase() : '';
      this.loandata = this.filteredData.filter(item => item.emp_id.toString().toLowerCase() === lowerCaseEmpId);
    }
  }

  handleDateChange() {
    if (this.selectedDate instanceof Date === false) {
      // Convert selectedDate to Date object if it's not already
      this.selectedDate = new Date(this.selectedDate);
    }
    if (this.selectedDate && !isNaN(this.selectedDate.getTime())) {
      const year = this.selectedDate.getFullYear();
      const month = this.selectedDate.getMonth() + 1;
      const formattedDate = `${year}-${month < 10 ? '0' + month : month}`;

      this.filterByDate(formattedDate);
    }
  }

  filterByDate(yearMonth: string) {
    this.loandata = this.loandata.filter(item => {
      const itemDate = new Date(item.date);
      const itemYear = itemDate.getFullYear();
      const itemMonth = itemDate.getMonth() + 1;
      const itemFormattedDate = `${itemYear}-${itemMonth < 10 ? '0' + itemMonth : itemMonth}`;
      return itemFormattedDate === yearMonth;
    });
  }
}

