import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AxiosService} from "../../axios.service";
import {response} from "express";
import {User} from "../../model/usermodel";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  showPassword: boolean = false;

  protected inputusername: string='';
  protected inputpassword: string='';
  protected inputcontact:string ='';
  protected inputemail:string='';
  protected inputrole:string='';
  protected inputempID:string='';


  constructor(private axiosService: AxiosService, private router: Router) {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  clearData(): void {

    this.inputusername='';
    this.inputpassword='';
    this.inputcontact='';
    this.inputemail='';
    this.inputrole='';
    this.inputempID='';
  }

  async submitData(): Promise<void> {

    let user=new User();
    user.username=this.inputusername;
    user.password=this.inputpassword;
    user.email=this.inputemail;
    user.contact=this.inputcontact;
    user.role=this.inputrole;
    user.empID=this.inputempID;

    if (user.username === "" || user.password === "" || user.email === "" || user.contact === "" || user.role === "" || user.empID === "") {
      alert("Please Fill All Fields...");
    } else if (user.username.length > 8 || user.username.length < 3) {
      alert("Please use between 3 and 8 characters for the username...");
    } else if (user.password.length < 8 || user.password.length > 10) {
      alert("Please use between 8 and 10 characters for the password...");
    } else if (!user.isValidEmail()) {
      alert("Please enter a valid email...");
    } else if (!user.isValidPhoneNumber(user.contact)) {
      alert("Please enter a valid phone number...");
    }else if(user.contact.length < 10) {
      alert("Please enter a valid phone number...");
    }else {

      this.axiosService.request(
        "POST",
        "/userregister", {
          "username": user.username,
          "password": user.password,
          "email": user.email,
          "contact": user.contact,
          "role": user.role,
          "employee":user.empID
        }
      )
        .then(response => {

          if (response.data && response.data.message) {
            alert(response.data.message);
          } else {
            alert("User registered successfully!");
            this.clearData();
            this.cancelPage();
          }
        })
        .catch(error => {


          if (error.response && error.response.data && error.response.data.message) {
            alert(error.response.data.message);
          } else {
            alert("An error occurred while registering the user.");
          }
        });
    }
  }


  cancelPage(): void {
    this.router.navigate(['/login']);
  }
}
