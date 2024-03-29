import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  constructor(private router: Router) {} // Inject Router
  showPassword: boolean = false;

  userLogin() {
    console.log(this.password);
    console.log(this.username);

    if (this.username === 'sahan' && this.password === 'sahan') {
      // Navigate to dashboard component if login is successful
      this.router.navigate(['/container']);
    }else if(this.username === 'kamal' && this.password === 'kamal'){

      this.router.navigate(['/storekeeper']);

    }
  }

  userSignup() {

    this.router.navigate(['/signup']);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
