import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from "../../service/services/user.service";
import {AuthService} from "../../model/authservice/auth.service";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {

  constructor(private router: Router,private userService:UserService,private authService: AuthService) {}  // Inject Router
  logout() {

    this.authService.logout();
    this.userService.clearUser();
    this.router.navigate(['/login']);

  }

}
