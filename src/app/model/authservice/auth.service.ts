// AuthService
import { Injectable } from '@angular/core';
import { AxiosService } from "../../axios.service";
import * as jwt_decode from "jwt-decode";
import { User } from "../usermodel";
import { BehaviorSubject, Observable } from "rxjs";
import { UserService } from "../../service/services/user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private axiosService: AxiosService, private userService: UserService) { }

  async login(username: string, password: string): Promise<User> {
    try {
      const response = await this.axiosService.request("POST", "/userlogin", {
        "username": username,
        "password": password,
      });

      const userData = response.data;
      const user = new User();

      user.id = userData.id;
      user.username = userData.username;
      user.password = userData.password;
      user.email = userData.email;
      user.contact = userData.contact;
      user.role = userData.roles;
      user.empID = userData.employee;
      user.token = userData.token;

      localStorage.setItem('currentUser', JSON.stringify(user));
      this.userService.setUser(user); // Store user details in UserService
      this.loggedIn.next(true);

      return user;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  }

  decodeToken(token: string): any {
    try {
      return jwt_decode.jwtDecode(token);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  logout() {
    localStorage.removeItem('token');
  }
  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
}
