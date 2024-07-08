import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AxiosService} from "../../axios.service";
import Swal from "sweetalert2";

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
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Inputs',
        text: 'Please enter a valid Employee ID and Email.',
      });
      return;
      return;
    }


    try {
       let useremail;

       useremail = new Email();

       useremail.getemail=email;
       useremail.getid=userID;
      const response = await this.axsio.request('POST', `/checkUserIDandUserEmail?userID=${userID}&email=${email}`, {}, {});
      if (response.data === true) {
        Swal.fire({
          icon: 'success',
          title: 'User Exists',
          text: 'Success: User exists.',
        });
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
          Swal.fire({
            icon: 'success',
            title: 'OTP Sent',
            text: 'OTP sent successfully!',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Failed to Send OTP',
            text: 'Failed to send OTP. Please try again later.',
          });
        }


      } else if (response.data === false) {
        Swal.fire({
          icon: 'error',
          title: 'User Not Found',
          text: 'Error: User does not exist.',
        });

      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Inputs',
        text: 'Invalid User Employee ID or Email. Please check and try again.',
      });
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
        Swal.fire({
          icon: 'success',
          title: 'OTP Verified',
          text: 'OTP verified successfully!',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Invalid OTP',
          text: 'Invalid OTP. Please enter a valid OTP and try again.',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'success',
        title: 'OTP Verified',
        text: 'OTP verified successfully!',
      });
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
      Swal.fire({
        icon: 'warning',
        title: 'Missing Fields',
        text: 'Please fill out all fields.',
      });
      return
    }
    if (newPassword !== newPassword2) {
      Swal.fire({
        icon: 'error',
        title: 'Passwords Do Not Match',
        text: 'Passwords do not match. Please check and try again.',
      });
      return

    }if (newPassword.length > 8) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Password Length',
        text: 'Password cannot exceed 8 characters. Please enter a shorter password.',
      });
      return
    }

    const password = newPassword.toString();
    try {
      const response = await this.axsio.request('PUT',`/resetPassword?otp=${this.currentOtp}&password=${password}`, {},{});
      if (response.data) {
        Swal.fire({
          icon: 'success',
          title: 'Password Reset Successful',
          text: 'Password reset successfully!',
        });
        await this.router.navigate(['/login']);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed to Reset Password',
          text: 'Failed to reset password. Please try again later.',
        });
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

