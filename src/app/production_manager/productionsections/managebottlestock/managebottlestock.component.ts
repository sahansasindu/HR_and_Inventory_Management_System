import { Component } from '@angular/core';
import {BottleStockForm} from "../../../model/bottlestock";
import {AxiosService} from "../../../axios.service";

@Component({
  selector: 'app-managebottlestock',
  templateUrl: './managebottlestock.component.html',
  styleUrl: './managebottlestock.component.css'
})
export class ManagebottlestockComponent {

  constructor(private axiosService:AxiosService) {
  }

  isFormVisible :boolean=false;

  toggleFormVisibility() {
    this.isFormVisible = !this.isFormVisible;
  }

  async addBottlestock() {

    const token = localStorage.getItem('currentUser');
    const headers = {
      Authorization: `Bearer ${token}`
    };

    const amout = (document.getElementById('addNewBottle') as HTMLInputElement).value;

    const get_Date = (document.getElementById('date') as HTMLInputElement).value;

    const amoutInt = parseInt(amout);

    // Early validation to ensure all fields are filled
    if (isNaN(amoutInt) || get_Date === "") {
      alert("Please Fill All Details");
      return;
    }

    const formDate = new Date((document.getElementById('date') as HTMLInputElement).value);
    const formattedDate = formDate.toISOString().split('T')[0]; // Gets 'YYYY-MM-DD'


    try {
      let bottleStockForm: BottleStockForm = new BottleStockForm();
      bottleStockForm.totalBottle=amoutInt;
      bottleStockForm.date=formattedDate;

      console.log(bottleStockForm)
      const response = await this.axiosService.request("POST", "/addnewpurchasednewBottles", {
        "date":bottleStockForm.date,
        "totalBottle":bottleStockForm.totalBottle

      }, headers)
        .then(response => {

          if (response.data && response.data.message) {
            alert(response.data.message);
          } else {
            alert("Submission successful");
            //console.log('Submission successful', response);
          }
        })
        .catch(error => {

          if (error.response && error.response.data && error.response.data.message) {
            alert(error.response.data.message);
          } else {

          }
        });
    } catch (error) {

      alert("Error submitting form");
      console.error('Error submitting form', error);
    }
  }
}
