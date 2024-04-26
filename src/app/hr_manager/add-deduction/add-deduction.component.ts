import { Component} from '@angular/core';
import { AxiosService } from "../../axios.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-add-deduction',
  templateUrl: './add-deduction.component.html',
  styleUrls: ['./add-deduction.component.css']
})
export class AddDeductionComponent {
  constructor(private axiosService: AxiosService,
              private router: Router) {
  }

  handleFormSubmit(formData: any) {
    this.axiosService.request("POST", "addDeduction", formData,{})
      .then(response => {
        console.log("Response from server:", response);
        alert("Deduction registered successfully!");
        // Optionally navigate to another route
        // this.router.navigate(['/someRoute']);
      }).catch(error => {
      console.error("Error registering deduction:", error);
      alert("There was an error registering the deduction.");
    });

  }

  onBack() {
    // Define your custom back logic here
    // Define your custom back logic here
    //this.router.navigate(['/some/path']);
    this.router.navigate(['./deduction']);

  }
}
