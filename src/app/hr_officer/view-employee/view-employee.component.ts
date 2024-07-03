// view-employee.component.ts
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
  filteredData: any[] = [];
  id: any;
  isVisible1: boolean = true;
  isVisible2: boolean = false;
  empID: any;
  sid: any;
  Did: any;
  satype: string = "";
  jrole: string = "";
  empname: any;
  mstate: string = "";
  contactno: any;
  companystate: string = "";
  address: any;
  dob: any;
  gender: any;
  page: number = 1; // <-- current page
  employeeId: any;
  searchSuggestions: string[] = [];
  employee: any;

  constructor(private axiosService: AxiosService, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.fetchEmployeeData();
  }

  fetchEmployeeData() {
    this.axiosService.request('GET', '/getEmployee', {}, {})
      .then(response => {
        this.loarddata = response.data;
        this.filteredData = response.data;
        console.log(this.loarddata); // Corrected logging statement
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  fetchEmployeeByID() {
    this.axiosService.request('GET', `getEmployeeByID/${this.id}`, {}, {})
      .then(response => {
        console.log('Response:', response); // Log the entire response for debugging
        if (response.data) {
          this.empID = response.data.employeeid;
          this.address = response.data.address;
          this.contactno = response.data.contact;
          this.companystate = response.data.company_status;
          this.Did = response.data.dep_id;
          this.sid = response.data.sec_id;
          this.mstate = response.data.ma_uma;
          this.jrole = response.data.job_role;
          this.satype = response.data.salary_type;
          this.empname = response.data.employee_name;
          this.dob = response.data.dob;
          this.gender = response.data.gender;

          console.log(response.data.employeeid, response.data.address, response.data.data);
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
    console.log(this.Did);
    console.log(this.sid);
    const employeeid = (document.getElementById('employeeid') as HTMLInputElement).value;

    console.log("new",employeeid);

    this.axiosService.request(
      "PUT",
      "/updateEmployee", {
        "employeeid": employeeid,
        "address": this.address,
        "contact": this.contactno,
        "employee_name": this.empname,
        "ma_uma": this.mstate,
        "dep_id": this.Did,
        "sec_id": this.sid,
        "gender": this.gender,
      }
      , {}).then(response => {
      console.log("Response from server:", response);
      alert("Employee details updated successfully!");
    }).catch(error => {
      console.error("Error updating user details:", error);
      let errorMessage = "An error occurred while updating user details. Please try again later.";
      if (error.response && error.response.data && error.response.data.message) {
        alert("Employee details updated successfully!");
      }

    });
  }

  filterByEmployeeId() {
    this.applyFilters();
    this.updateSearchSuggestions();
  }

  applyFilters() {
    let filtered = this.loarddata;
    if (this.employeeId) {
      const lowerCaseEmpId = this.employeeId.toLowerCase();
      filtered = filtered.filter(item => item.employeeid.toString().toLowerCase().includes(lowerCaseEmpId));
    }
    this.filteredData = filtered;
    this.cdr.detectChanges(); // Ensure view updates
  }

  updateSearchSuggestions() {
    if (this.employeeId) {
      const lowerCaseEmpId = this.employeeId.toLowerCase();
      this.searchSuggestions = this.filteredData
        .map(item => item.employeeid.toString())
        .filter(empId => empId.toLowerCase().includes(lowerCaseEmpId));
    } else {
      this.searchSuggestions = [];
    }
    this.cdr.detectChanges(); // Ensure view updates
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

  back() {
    this.isVisible1 = true;
    this.isVisible2 = false;
  }
}
