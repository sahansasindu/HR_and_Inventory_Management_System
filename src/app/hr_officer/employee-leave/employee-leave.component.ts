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

  employeeId:any;
  loarddata1: any[] = [];
  loarddata: any[] = [];
  filteredData: any[] = [];
  filteredData2: any[] = [];
  filteritem1: any[]=[];
  filteritem: any[]=[];



  gempid: string = "";
  intime: string = '';
  outtime: string = '';
  date: any;
  greason: any;
  gstate: any;






  constructor(private axiosService: AxiosService, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.fetchLeaveData();
  }

  show() {
    this.isVisible1 = true;
    this.isVisible2 = false;
    this.isVisible3 = false;
    this.isVisible4 = false;
    this.employeeId="";

  }

  show2() {
    this.isVisible1 = false;
    this.isVisible2 = true;
    this.isVisible3 = false;
    this.isVisible4 = false;
    this.employeeId="";

  }

  show3() {
    this.isVisible1 = false;
    this.isVisible2 = false;
    this.isVisible3 = true;
    this.isVisible4 = false;
    this.employeeId="";
    this.fetchLeaveData();
  }
  show4() {

    this.isVisible1 = false;
    this.isVisible2 = false;
    this.isVisible3 = false;
    this.isVisible4 = true;
    this. fetchgetepassdata();
    this.employeeId="";
  }

  fetchLeaveData() {
    this.axiosService.request('GET', 'getLeave', null,{})
      .then(response => {
        this.loarddata1 = response.data;
        this.filteredData =response.data;
        console.log(this.loarddata1); // Corrected logging statement
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

    if (!this.empid || !this.endtime || !this.ltype|| !this.reason|| !this.stime|| !this.astatus) {
      alert('Please fill in all required fields.');
      return;
    }
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
      alert("add leave successfully!");
    }).catch(error => {
      console.error("Error add leave details:", error);
      alert("Error add leave details. Please try again.");
    });

    this.endtime="";
    this.ltype="";
    this.reason="";
    this.stime="";
    this.astatus="";
    this.empid="";

  }

  filterByEmployeeId() {

    if (this.employeeId === "") {
      this.fetchLeaveData();
      this.fetchgetepassdata();

    } else {
      this.loarddata1=this.filteredData;
      const lowerCaseEmpId = this.employeeId ? this.employeeId.toString().toLowerCase() : '';
      this.filteritem1 = this.loarddata1.filter(item => item.emp_id.toString().toLowerCase() === lowerCaseEmpId);
      console.log("Filtered data:", this.filteredData);
      this.loarddata1=this.filteritem1;


      this.loarddata=this.filteredData2;
      const lowerCaseEmpId2 = this.employeeId ? this.employeeId.toString().toLowerCase() : '';
      this.filteritem = this.loarddata.filter(item => item.emp_id.toString().toLowerCase() === lowerCaseEmpId2);
      this.loarddata=this.filteritem;

    }
  }


  submitData2() {

    if (!this.date || !this.intime || !this.outtime || !this.greason|| !this.gstate|| !this.gempid) {
      alert('Please fill in all required fields.');
      return;
    }

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
      alert("add gatepass successfully!");
    }).catch(error => {
      console.error("Error add gatepass details:", error);
      let errorMessage = "An error occurred while updating user details. Please try again later.";
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      alert(errorMessage);
    });

    this.date="";
    this.intime="";
    this.outtime="";
    this.greason="";
    this.gstate="";
    this.gempid="";


  }

  fetchgetepassdata() {

    this.axiosService.request('GET', '/getGatepass', null,{})
      .then(response => {
        this.loarddata = response.data;
        this.filteredData2 =response.data;
        console.log(this.loarddata1); // Corrected logging statement
      })
      .catch(error => {
        console.error('Error fetching data:', error);


      });
  }




}
