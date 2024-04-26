import {Component, Input} from '@angular/core';
import {AxiosService} from "../../axios.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-update-loan',
  templateUrl: './update-loan.component.html',
  styleUrl: './update-loan.component.css'
})
export class UpdateLoanComponent {


  id: any;
  loandata = {
    emp_id: "",
    loan_details:"",
    loan_amount:"",
    interest_amount:"",

  };

  constructor(private axiosService: AxiosService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.fetchAllowanceData(); // Changed from fetchInvoiceData to fetchAllowanceData
    });
  }

  fetchAllowanceData() { // Changed from fetchInvoiceData to fetchAllowanceData
    this.axiosService.request('GET', `/getLoanByID/${this.id}`, null,{})
      .then(response => {
        Object.assign(this.loandata, response.data);
        console.log(this.loandata);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  handleFormSubmit(formData: any) {
    const updatedFormData = {
      ...formData,
      emp_id: this.id
    };

    this.axiosService.request("PUT", "/updateLone", updatedFormData,{}) // Changed from "/updateDeduction" to "/updateAllowance"
      .then(response => {
        console.log("Response from server:", response);
        alert("loan details update successfully!");
      }).catch(error => {
      console.error("Error updating loan details:", error);
      let errorMessage = "An error occurred while updating loan details. Please try again later.";
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      alert(errorMessage);
    });

  }

  onBack() {
    this.router.navigate(['/loan']); // Changed to navigate to '/allowance' route
  }
}

