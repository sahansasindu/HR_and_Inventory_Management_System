import {ChangeDetectorRef, Component} from '@angular/core';
import {AxiosService} from "../../axios.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-loan',
  templateUrl: './add-loan.component.html',
  styleUrl: './add-loan.component.css'
})
export class AddLoanComponent {

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

  ngOnInit() {

    this.fetchDeductionData2();
  }

  constructor(private axiosService: AxiosService, private router: Router, private cdr: ChangeDetectorRef) {
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
      alert("loan details add successfully!");
    }).catch(error => {
      console.error("Error updating loan details:", error);
      let errorMessage = "An error occurred while updating loan details. Please try again later.";
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

  back() {

    this.router.navigate(['./loan']);
  }
}
