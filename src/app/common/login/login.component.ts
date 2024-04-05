import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {User} from "../../model/usermodel";
import {animate} from "@angular/animations";
import {AxiosService} from "../../axios.service";
import {Authervice} from "../../model/authservice/authervice";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  inputusername: string = "";
  inputpassword: string = "";


  showPassword: boolean = false;

  constructor(private router: Router,private autho:Authervice,private user:User) {

  }

  userLogin() {

    if (this.inputusername === "" || this.inputpassword === "") {
      alert("Please You Should Enter User name and Password");
    } else  {
      this.autho.login(this.inputusername,this.inputpassword);
      if(this.autho.User.role=="HR_Manager"){
        this.router.navigate(['/productionmanager']);
      }
    }
  }

  //this.router.navigate(['/productionmanager']);
  //this.router.navigate(['/storekeeper']);

  userSignup() {
    this.router.navigate(['/signup']);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  protected readonly animate = animate;
}
