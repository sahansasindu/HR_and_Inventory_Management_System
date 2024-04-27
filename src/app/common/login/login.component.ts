import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {User} from "../../model/usermodel";
import {UserService} from "../../service/services/user.service";
import {AuthService} from "../../model/authservice/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  inputusername: string = "";
  inputpassword: string = "";

  showPassword: boolean = false;

  private routes: { [role in UserRole]?: string } = {
    "HR_Manager": '/hrmcontainer',
    "Accountant": '/container',
    "Production_Manager": '/productionmanager',
    "Store_Keeper": '/storekeeper'
  };

  constructor(private router: Router, private authService: AuthService, private useS:UserService) {}

  async userLogin() {
    if (this.inputusername === "" || this.inputpassword === "") {
      alert("Please enter username and password.");
      return;
    }

    try {

      const user = await this.authService.login(this.inputusername, this.inputpassword);
      this.useS.setUser(user);

      const roleBasedRoute = this.routes[user.role as UserRole];
      if (!roleBasedRoute) {
        alert("Role not recognized, cannot navigate to dashboard.");
        return;
      }

      await this.router.navigate([roleBasedRoute], { queryParams: { token: user.token } });

    } catch (error) {

      alert("not navigate")
      console.log(error)
      this.inputusername='';
      this.inputpassword='';
    }
  }


  userSignup() {
    this.router.navigate(['/signup']);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }



}

type UserRole = 'HR_Manager' | 'Accountant' | 'Production_Manager' | 'Store_Keeper';
