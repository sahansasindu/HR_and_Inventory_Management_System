import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AxiosService} from "../axios.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = "";
  password: string = "";

  constructor(private ax:AxiosService,private router: Router) {} // Inject Router
  showPassword: boolean = false;

  userLogin() {
    console.log(this.password);
    console.log(this.username);

    if (this.username=="" || this.password=="") {
      alert("User Name or Password Missing...")
    }else {
      this.ax.request(
        "POST",
        "userlogin", {
          "username": this.username,
          "password": this.password
        }
      ).then(response => {
        // Handle the response here
        alert("Response from server: "+ response);
        // You can perform further actions based on the response
        this.userDashBoard();
      }).catch(error => {
        // Handle errors here
        alert("User Name or Password Dont Matched..."+error);
      });
    }
  }

  userSignup() {

    this.router.navigate(['/signup']).then(r => true);
  }
  userDashBoard(){
    this.router.navigate(['/container']).then(r => true);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
