import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AxiosService } from "../../axios.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {

  loarddata: any[] = [];
  id: any;
  loarddata1: any[] = [];



  isVisible1: boolean = true;
  isVisible2: boolean = false;

  empID:any;
  sid: any;
  Did: any;
  satype:  string = "";
  jrole:  string = "";
  empname: any;
  mstate:  string = "";
  contactno: any;
  companystate: string = "";
  address: any;
  dob: any;
  gender: any

  employeeId: any;
  selectedDate: any;


  constructor(private axiosService: AxiosService, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.fetchEmployeeData();
    this.fetchEmployeeByID();
  }

  fetchEmployeeData() {

    this.axiosService.request('GET', '/getEmployee', {}, {})
      .then(response => {
        this.loarddata1 = response.data;
        this.loarddata = response.data;

        console.log(this.loarddata); // Corrected logging statement
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }


  filterByEmployeeId() {
    if (this.employeeId === "") {
      this.fetchEmployeeData()
    } else {
      const lowerCaseEmpId = this.employeeId ? this.employeeId.toString().toLowerCase() : '';
      this.loarddata = this.loarddata1.filter(item => item.employeeid.toString().toLowerCase() === lowerCaseEmpId);
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
    console.log(yearMonth);
    this.loarddata = this.loarddata.filter(item => {
      const itemDate = new Date(item.dob);
      const itemYear = itemDate.getFullYear();
      const itemMonth = itemDate.getMonth() + 1;
      const itemFormattedDate = `${itemYear}-${itemMonth < 10 ? '0' + itemMonth : itemMonth}`;
      return itemFormattedDate === yearMonth;

      console.log(itemFormattedDate);
    });
  }



  fetchEmployeeByID() {
    if (!this.id) {
      console.error('Employee ID is missing.');
      return;
    }

    const endpoint = `getEmployeeByID/${this.id}`; // Assuming the ID is part of the URL
    this.axiosService.request('GET', endpoint, null, {})
      .then(response => {
        console.log('Response:', response); // Log the entire response for debugging
        if (response.data) {
          this.empID=response.data.employee_id;
          this.address = response.data.address;
          this.contactno = response.data.contact;
          this.companystate = response.data.company_status;
          this.Did=response.data.dep_id;
          this.sid=response.data.sec_id;
          this.mstate=response.data.ma_uma;
          this.jrole=response.data.job_role;
          this.satype=response.data.salary_type;
          this.empname = response.data.employee_name;
          this.dob=response.data.dob;
          this.gender=response.data.gender;



        } else {
          console.error('Empty response data.');
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }


  Update(id: any) {
    this.isVisible1 = false;
    this.isVisible2 = true;
    this.id = id;
    this.fetchEmployeeByID();
    console.log(this.id);
  }


  Delete(id: any) {
    this.axiosService.request('DELETE', 'deleteEmployee', { employee_id: id }, {})
      .then(response => {
        this.fetchEmployeeData();
        console.log("Response from server:", response);
        alert("Employee details deleted successfully!");
      })
      .catch(error => {
        console.error("Error deleting Deduction:", error);
        alert("Error deleting Deduction!");
      });
  }


  handleFormSubmit() {


    console.log(this.Did) ;
    console.log(this.sid);


    this.axiosService.request(
      "PUT",
      "updateEmployee", {
        "employee_id": this.id,
        "address": this.address,
        "company_status": this.companystate,
        "contact": this.contactno,
        "employee_name": this.empname,
        "job_role": this.jrole,
        "ma_uma": this.mstate,
        "salary_type": this.satype,
        "dep_id": this.Did,
        "sec_id": this.sid,
        "cv":"null",
        "dob":this.dob,
        "gender":this.gender,

      }
      , {}).then(response => {
      console.log("Response from server:", response);
      alert("Employee details updated successfully!");
    }).catch(error => {
      console.error("Error updating user details:", error);
      let errorMessage = "An error occurred while updating user details. Please try again later.";
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      alert(errorMessage);
    });
  }


  back() {
    this.isVisible1 = true;
    this.isVisible2 = false;

  }
}
