import { ChangeDetectorRef, Component } from '@angular/core';
import { AxiosService } from "../../axios.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-employee-leave',
  templateUrl: './employee-leave.component.html',
  styleUrls: ['./employee-leave.component.css']
})
export class EmployeeLeaveComponent {

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
  loandata: any[] = [];
  id: any;
  employeeId:any;
  filteredData: any[] = [];
  sa: any[]=[];



  gempid: string = "";
  intime: string = '';
  outtime: string = '';
  date: any;
  greason: any;
  gstate: any;
  loarddata: any[] = [];



  constructor(private axiosService: AxiosService, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.fetchLeaveData();
  }

  show() {
    this.isVisible1 = true;
    this.isVisible2 = false;
    this.isVisible3 = false;
    this.isVisible4 = false;

  }

  show2() {
    this.isVisible1 = false;
    this.isVisible2 = true;
    this.isVisible3 = false;
    this.isVisible4 = false;

  }

  show3() {
    this.isVisible1 = false;
    this.isVisible2 = false;
    this.isVisible3 = true;
    this.isVisible4 = false;
  }
  show4() {

    this.isVisible1 = false;
    this.isVisible2 = false;
    this.isVisible3 = false;
    this.isVisible4 = true;
    this. fetchDeductionData2();
  }

  fetchLeaveData() {
    this.axiosService.request('GET', 'getLeave', null,{})
      .then(response => {
        this.loandata = response.data;
        this.filteredData =response.data;
        console.log(this.loandata); // Corrected logging statement
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  submitData() {
    console.log(this.empid);
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
      }
    ,{}).then(response => {
      console.log("Response from server:", response);
      alert("User details updated successfully!");
    }).catch(error => {
      console.error("Error updating user details:", error);
      alert("Error updating user details. Please try again.");
    });
  }

  filterByEmployeeId() {
    console.log("Employee ID input:", this.employeeId); // Check input value
    if (this.employeeId === "") {
      this.fetchLeaveData();
      console.log("Empty employee ID, fetching all data");
    } else {
      this.loandata=this.filteredData;
      const lowerCaseEmpId = this.employeeId ? this.employeeId.toString().toLowerCase() : '';
      this.sa = this.loandata.filter(item => item.emp_id.toString().toLowerCase() === lowerCaseEmpId);
      console.log("Filtered data:", this.filteredData); // Check filtered data
      this.loandata=this.sa;
    }
  }


  submitData2() {

    console.log(this.empid);
    this.axiosService.request(
      "POST",
      "addGatepass", {
        "date": this.date,
        "in_time": this.intime,
        "out_time": this.outtime,
        "reson": this.greason,
        "status": this.gstate,
        "emp_id": this.gempid,

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

  fetchDeductionData2() {

    this.axiosService.request('GET', '/getGatepass', null,{})
      .then(response => {
        this.loarddata = response.data;
        //this.filteredData =response.data;
        console.log(this.loandata); // Corrected logging statement
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


}
