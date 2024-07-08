import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AxiosService} from "../../axios.service";
import {response} from "express";
import {User} from "../../model/usermodel";
import Swal from "sweetalert2";

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
      Swal.fire({
        icon: 'warning',
        title: 'Missing Fields',
        text: 'Please fill out all fields.',
      });
    } else if (user.username.length > 8 || user.username.length < 3) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Username Length',
        text: 'Please use between 3 and 8 characters for the username.',
      });
    } else if (user.password.length < 8 || user.password.length > 10) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Password Length',
        text: 'Please use between 5 and 8 characters for the password.',
      });
    } else if (!user.isValidEmail()) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Email',
        text: 'Please enter a valid email.',
      });
    } else if (!user.isValidPhoneNumber(user.contact)) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Phone Number',
        text: 'Please enter a valid phone number.',
      });
    }else if(user.contact.length < 10) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Phone Number',
        text: 'Please enter a valid phone number.',
      });
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
            Swal.fire({
              icon: 'info',
              title: 'API Response',
              text: response.data.message,
            });
          } else {
            Swal.fire({
              icon: 'success',
              title: 'Registration Successful',
              text: 'User registered successfully!',
            });
            this.clearData();
            this.cancelPage();
          }
        })
        .catch(error => {
          if (error.response && error.response.data && error.response.data.message) {
            Swal.fire({
              icon: 'info',
              title: 'API Response',
              text: error.response.data.message,
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Registration Error',
              text: 'An error occurred while registering the user.',
            });
          }
        });
    }
  }

  cancelPage(): void {
    this.router.navigate(['/login']);
  }
}
