import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  showPassword: boolean = false;
  username: string = '';
  password: string = '';
  email: string = '';
  tpno:string = '';
  role:string = '';

  constructor(private router: Router) {} // Inject Router


  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  clearData() {
    console.log("sdd");
    this.username = '';
    this.password = '';
    this.email = '';
    this.role = 'user';
    this.tpno = '';

  }

  submitData() {
    console.log(this.role);
    console.log(this.password);
    console.log(this.email);
    console.log(this.username);
    console.log(this.tpno);
  }

  cancelPage() {

    this.router.navigate(['/login']);
  }
}
