import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AxiosService} from "../../axios.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-allowances',
  templateUrl: './add-allowances.component.html',
  styleUrl: './add-allowances.component.css'
})
export class AddAllowancesComponent {

  constructor(private axiosService: AxiosService,
              private router: Router) {
  }

  handleFormSubmit(formData: any) {
    this.axiosService.request("POST", "addAllowance", formData,{})
      .then(response => {
        console.log("Response from server:", response);
        alert("Allowance registered successfully!");
        // Optionally navigate to another route
        // this.router.navigate(['/someRoute']);
      }).catch(error => {
      console.error("Error registering Allowances:", error);
      alert("There was an error registering the Allowances.");
    });

  }

  onBack() {
    // Define your custom back logic here
    // Define your custom back logic here
    //this.router.navigate(['/some/path']);
    this.router.navigate(['./allowance']);

  }

}
