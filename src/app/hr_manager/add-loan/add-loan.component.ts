import {ChangeDetectorRef, Component} from '@angular/core';
import {AxiosService} from "../../axios.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-loan',
  templateUrl: './add-loan.component.html',
  styleUrl: './add-loan.component.css'
})
export class AddLoanComponent {

  constructor(private axiosService: AxiosService,
              private router: Router) {
  }


  handleFormSubmit(formData: any) {
    this.axiosService.request("POST", "/addLoan", formData,{})
      .then(response => {
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

  onBack() {

    this.router.navigate(['./loan']);

  }
}
