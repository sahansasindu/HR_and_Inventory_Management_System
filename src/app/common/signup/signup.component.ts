import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AxiosService} from "../../axios.service";
import {response} from "express";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  showPassword: boolean = false;
  username: string = "";
  password: string = "";
  email: string = "";
  tpno:string = "";
  role:string = "";
  emp_ID:string="";
  toleset:Set<string>=new Set<string>();

  constructor(private axiosService:AxiosService,private router: Router) {} // Inject Router



  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  clearData() {

    this.username = "";
    this.password = "";
    this.email = "";
    this.role = "";
    this.tpno = "";
    this.emp_ID="";

  }

   async submitData() {



    if(this.role=="" || this.password=="" || this.email=="" || this.username=="" || this.tpno==""){
        alert("Please Fill The All Fields...")
    }else if(this.username.length>8 || this.username.length<3){
        alert("Please use between 3 and 8 characters for user Name.....")
    }else if(this.password.length<8 || this.password.length>10){
      alert("Please Use between 8 and 10 characters for the password...")
    }else if(!this.isValidEmail(this.email)){
      alert("Please Enter Validate Email...")
    }else if(!this.isValidPhoneNumber(this.tpno)){
      alert("Please Enter Validate Phone Numbers...")
    }else {

      console.log(this.role);
      console.log(this.password);
      console.log(this.email);
      console.log(this.username);
      console.log(this.tpno);
      console.log(this.emp_ID);

       this.axiosService.request(
         "POST",
         "userregister", {
           "contact": this.tpno,
           "email": this.email,
           "password": this.password,
           "role": this.role,
           "username": this.username
         }
       ,{}).then(response => {
         // Handle the response here
         console.log("Response from server:", response);
         // You can perform further actions based on the response
         alert("User registered successfully!");
       }).catch(error => {
         // Handle errors here
         console.error("Error registering user:", error);
         alert("User name or Password Already Exist...");
       });
    }
  }

  isValidPhoneNumber(phoneNumber: string): boolean {
    // This regex checks for a sequence of digits, which is a simple way to validate a phone number that includes only numbers.
    const regex = /^\d+$/;
    return regex.test(phoneNumber);
  }
  isValidEmail(email: string): boolean {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
    return emailRegex.test(email);
  }

  cancelPage() {

    this.router.navigate(['/login']);
  }
}
