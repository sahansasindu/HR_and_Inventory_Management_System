import { Component } from '@angular/core';
import {AxiosService} from "../../axios.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-salarydetails',
  templateUrl: './add-salarydetails.component.html',
  styleUrl: './add-salarydetails.component.css'
})
export class AddSalarydetailsComponent {
  constructor(private axiosService: AxiosService,
              private router: Router) {
  }

  handleFormSubmit(formData: any) {
    this.axiosService.request("POST", "addSalary", formData,{})
      .then(response => {
        console.log("Response from server:", response);
        alert("BasicSalary registered successfully!");
        // Optionally navigate to another route
        // this.router.navigate(['/someRoute']);
      }).catch(error => {
      console.error("Error registering BasicSalary:", error);
      alert("There was an error registering the BasicSalary.");
    });

  }

  onBack() {
    // Define your custom back logic here
    // Define your custom back logic here
    //this.router.navigate(['/some/path']);
    this.router.navigate(['./mdc']);

  }

}
