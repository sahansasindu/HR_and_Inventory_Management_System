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
      loan_id: this.id
    };

    console.log('Updated Form Data:', updatedFormData); // Log updated form data

    this.axiosService.request("PUT", "/updateLone", updatedFormData, {})
      .then(response => {
        console.log("Response from server:", response);
        alert("Loan details updated successfully!");
        // Optionally, you can navigate to another page or perform any additional actions upon successful update
      })
      .catch(error => {
        console.error("Error updating loan details:", error);
        let errorMessage = "An error occurred while updating loan details. Please try again later.";
        if (error.response && error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
        alert(errorMessage);
      });
  }
/*

  handleFormSubmit() {
    const token = localStorage.getItem('currentUser');
    const headers = {
      Authorization: `Bearer ${token}`
    };
    const formData = new FormData(); // Create FormData object to send form data including file

    // Append form data to FormData object
    formData.append('loan_id', this.id);
    formData.append('emp_id', this.loandata.emp_id);
    formData.append('loan_amount',this.loandata.loan_amount);
    formData.append('interest_amount', this.loandata.interest_amount);
    formData.append('loan_details',this.loandata.loan_details);


    // Send POST request with FormData
    this.axiosService.request("PUT", "/updateLone", formData,headers)
      .then(response => {
        console.log("Response from server:", response);
        alert("User details updated successfully!");
      })
      .catch(error => {
        console.error("Error updating user details:", error);
        alert("Error updating user details. Please try again.");
      });
  }

*/
  onBack() {
    this.router.navigate(['/loan']);
  }
}

