import {ChangeDetectorRef, Component} from '@angular/core';
import {AxiosService} from "../../axios.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-advance',
  templateUrl: './add-advance.component.html',
  styleUrl: './add-advance.component.css'
})
export class AddAdvanceComponent {
  isVisible1: boolean = true;
  isVisible2: boolean = false;
  isVisible3: boolean = false;
  isVisible4: boolean = false;

  isLoading: boolean = false;
  empid: string = "";
  amount: any;
  reson: any;
  astatus: any;

  employeeId: any;
  filteredData: any[] = [];
  sa: any[]=[];
  loandata: any[] = [];
  loarddata: any[] = [];
  id: any;


  lempid:string = "";
  loandetails:string = "";
  lamount:string = "";
  liamount:string = "";




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
  }


  constructor(private axiosService: AxiosService, private router: Router, private cdr: ChangeDetectorRef) {
  }


  filterByEmployeeId() {
    console.log("Employee ID input:", this.employeeId); // Check input value
    if (this.employeeId === "") {
      this.fetchDeductionData();
      console.log("Empty employee ID, fetching all data");
    } else {
      this.loandata=this.filteredData;
      const lowerCaseEmpId = this.employeeId ? this.employeeId.toString().toLowerCase() : '';
      this.sa = this.loandata.filter(item => item.emp_id.toString().toLowerCase() === lowerCaseEmpId);
      console.log("Filtered data:", this.filteredData); // Check filtered data
      this.loandata=this.sa;
    }
  }


  ngOnInit() {
    this.fetchDeductionData();
    this.fetchDeductionData2();
  }

  fetchDeductionData() {
    this.isLoading = true;
    this.axiosService.request('GET', '/getAdvance', null,{})
      .then(response => {
        this.loandata = response.data;
        this.filteredData =response.data;
        console.log(this.loandata); // Corrected logging statement
      })
      .catch(error => {
        console.error('Error fetching data:', error);


      });
  }


  submitData1() {
    console.log(this.empid);
    this.axiosService.request(
      "POST",
      "addAdvance", {
        "emp_id": this.empid,
        "amount": this.amount,
        "reson": this.reson,
        "status": this.astatus,

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

  submitData2() {

    console.log(this.empid);
    this.axiosService.request(
      "POST",
      "/addLoan", {
        "emp_id": this.lempid,
        "loan_details": this.loandetails,
        "loan_amount": this.lamount,
        "interest_amount": this.liamount,

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
    this.isLoading = true;
    this.axiosService.request('GET', '/getLoan', null,{})
      .then(response => {
        this.loarddata = response.data;
        //this.filteredData =response.data;
        console.log(this.loandata); // Corrected logging statement
      })
      .catch(error => {
        console.error('Error fetching data:', error);


      });
  }


}

