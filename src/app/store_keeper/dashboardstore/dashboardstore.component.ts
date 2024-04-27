import {Component, OnInit} from '@angular/core';
import {User} from "../../model/usermodel";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../service/services/user.service";
import {AuthService} from "../../model/authservice/auth.service";

@Component({
  selector: 'app-dashboardstore',
  templateUrl: './dashboardstore.component.html',
  styleUrl: './dashboardstore.component.css'
})
export class DashboardstoreComponent implements OnInit {
  get user(): User {
    return this._user;
  }
  token: string = '';
  private _user: User = new User();

  constructor(private route: ActivatedRoute, private authService: AuthService, private userService:UserService) {}

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      if (this.token) {
        const decodedToken = this.authService.decodeToken(this.token);
        if (decodedToken) {

          // Set user details from decoded token
          this._user.id = decodedToken.id;
          this._user.username = decodedToken.username;
          this._user.password=decodedToken.password;
          this._user.empID=decodedToken.employee;
          this._user.email=decodedToken.email;
          this._user.contact=decodedToken.contact;
          this._user.role=decodedToken.role;

          this.userService.setUser(this._user);

          console.log(this._user)

        }
      }
    });
  }
}
