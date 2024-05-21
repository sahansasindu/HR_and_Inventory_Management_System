import { Component } from '@angular/core';
import {Router} from "@angular/router";

import {UserService} from "../../service/services/user.service";
import {AuthService} from "../../model/authservice/auth.service";

@Component({
  selector: 'app-sidemenubarstoremanager',
  templateUrl: './sidemenubarstoremanager.component.html',
  styleUrl: './sidemenubarstoremanager.component.css'
})
export class SidemenubarstoremanagerComponent {
  constructor(private router: Router,private userService:UserService,private authService: AuthService) {}


  logout() {
    const confirmed = window.confirm('Are you sure you want to logout?');
    if (confirmed) {
      this.authService.logout();
      this.userService.clearUser();
      this.router.navigate(['/login']);
    }
  }


}
