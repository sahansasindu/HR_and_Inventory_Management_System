import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AxiosService} from "../../axios.service";
import {createSecurePair} from "node:tls";

@Component({
  selector: 'app-resetpword',
  templateUrl: './resetpword.component.html',
  styleUrl: './resetpword.component.css'
})
export class ResetpwordComponent {

  constructor( private router: Router,private axsio:AxiosService) {
  }
  isformEnternewPAssword: boolean = false;
  isformenterUSerDetails: boolean = true;
  isveryfyOTP:boolean=false;

  currentOtp:string='';


  async getOTPCode() {
    const userID = (document.getElementById('empId') as HTMLInputElement).value;
    const email = (document.getElementById('UserMail') as HTMLInputElement).value;

    if (userID == "" || email == "" || !this.isValidEmail(email)) {
      alert("Please enter valid Employee ID and Email");
      return;
    }


    try {
       let useremail;

       useremail = new Email();

       useremail.getemail=email;
       useremail.getid=userID;
      const response = await this.axsio.request('POST', `/checkUserIDandUserEmail?userID=${userID}&email=${email}`, {}, {});
      if (response.data === true) {
        alert("Success: User exists");
        const email = {
          to:useremail.getemail,
          subject:"Your OTP ",
          content:""
        }
        this.isformenterUSerDetails = !this.isformenterUSerDetails;
        const response2=await this.axsio.request("POST",`/sendMailToUser?userID=${useremail.getid}`,{

          to:email.to,
          subject:email.subject,
          content:email.content

        },{})
        if (response2.data === true) {
          // OTP sent successfully
          this.isformenterUSerDetails = false;
          this.isveryfyOTP = true;
          alert("OTP sent successfully!");
        } else {
          alert("Failed to send OTP.");
        }


      } else if (response.data === false) {
        alert("Error: User does not exist");

      }
    } catch (error) {
      alert("In valid User Employee ID OR Email");
    }
  }

  async verifyOTPCode() {
    const otp = (document.getElementById('OTP') as HTMLInputElement).value;

    try {
      const response = await this.axsio.request('POST',`/verifyGetOtp?otp=${otp}`, {},{});
      if (response) {
        this.currentOtp=response.data;
        // OTP verified successfully
        this.isveryfyOTP = false;
        this.isformEnternewPAssword = true;
        alert("OTP verified successfully!");
      } else {
        alert("Invalid OTP.");
      }
    } catch (error) {
      alert("OTP verified successfully!");
    }
  }

  login() {
    this.router.navigate(['/login']);
  }

  isValidEmail(email:string): boolean {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
    return emailRegex.test(email);
  }

  async resetPassword() {

    const newPassword = (document.getElementById('password1') as HTMLInputElement).value;
    const newPassword2 = (document.getElementById('password2') as HTMLInputElement).value;

    if(newPassword==='' || newPassword2===''){
      alert('Please File All Fields');
      return
    }
    if (newPassword !== newPassword2) {
      alert('Passwords do not match.');
      return

    }if (newPassword.length > 8) {
      alert('Password cannot exceed 8 characters.');
      return
    }

    const password = newPassword.toString();
    try {
      const response = await this.axsio.request('PUT',`/resetPassword?otp=${this.currentOtp}&password=${password}`, {},{});
      if (response.data) {
        alert("Password reset successfully!");
        await this.router.navigate(['/login']);
      } else {
        alert("Failed to reset password.");
      }
    } catch (error) {

    }
  }
}
export class Email{


  get getid(): string {
    return this._getid;
  }

  set getid(value: string) {
    this._getid = value;
  }
  get getemail(): string {
    return this._getemail;
  }

  set getemail(value: string) {
    this._getemail = value;
  }


  private _getemail: string='';
  private _getid:string='';

}

