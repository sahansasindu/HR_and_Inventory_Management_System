import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from "../../service/services/user.service";
import {AuthService} from "../../model/authservice/auth.service";
import Swal from "sweetalert2";

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
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete Fields',
        text: 'Please enter both username and password.',
      });
      return;
    }

    try {

      const user = await this.authService.login(this.inputusername, this.inputpassword);
      this.useS.setUser(user);

      const roleBasedRoute = this.routes[user.role as UserRole];
      if (!roleBasedRoute) {
        Swal.fire({
          icon: 'error',
          title: 'Role Not Recognized',
          text: 'Cannot navigate to dashboard. Role is not recognized.',
        });
        return;
      }

      await this.router.navigate([roleBasedRoute], { queryParams: { token: user.token } });

    } catch (error) {

      Swal.fire({
        icon: 'error',
        title: 'Authentication Failed',
        text: 'Username or password not matched. Please try again.',
      });
      console.log(error)
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
