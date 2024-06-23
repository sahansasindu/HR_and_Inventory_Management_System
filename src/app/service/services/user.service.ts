import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../model/usermodel';
import { isPlatformBrowser } from '@angular/common';
import {HttpClient} from "@angular/common/http";
import {AxiosService} from "../../axios.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient,private axiosService: AxiosService,@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.initUser();
    }
  }

  private initUser(): void {
    const user = this.getUserFromStorage();
    if (user) {
      this.userSubject.next(user);
    }
  }

  setUser(user: User): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.userSubject.next(user);
    }
  }

  getUserFromStorage(): User | null {
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('currentUser');
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  getUser(): Observable<User | null> {
    return this.userSubject.asObservable();
  }

  clearUser(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('currentUser');
      this.userSubject.next(null);
    }
  }

}
