import { Component, OnInit } from '@angular/core';
import { AxiosService } from "../../axios.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.css']
})
export class ManageAccountComponent implements OnInit {
  username: any;
  password: any;
  contact: any;
  email: any;
  id: string = "2";

  constructor(private axiosService: AxiosService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.fetchUserData();
  }

  fetchUserData() {
    this.axiosService.request('GET', `/getuserdetailsByID/${this.id}`, null,{})
      .then(response => {
        console.log(response.data); // Corrected logging statement
        this.username = response.data.username;
        this.password = response.data.password;
        this.contact = response.data.contact;
        this.email = response.data.email;
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }

  submitData() {
    this.axiosService.request(
      "PUT",
      "updateuserDetails", {
        "id": this.id,
        "username": this.username,
        "password": this.password,
        "email": this.email,
        "contact": this.contact,
        "roles": "user"
      }
    ,{}).then(response => {
      console.log("Response from server:", response);
      alert("User details updated successfully!");
    }).catch(error => {
      console.error("Error updating user details:", error);
      alert("Error updating user details. Please try again.");
    });
  }

}
