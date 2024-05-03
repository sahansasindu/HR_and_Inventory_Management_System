import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-resetpword',
  templateUrl: './resetpword.component.html',
  styleUrl: './resetpword.component.css'
})
export class ResetpwordComponent {

  constructor( private router: Router) {
  }
  isformEnternewPAssword: boolean = false;
  isformenterUSerDetails: boolean = true;

  enternewpassword() {
    this.isformEnternewPAssword=!this.isformEnternewPAssword;
    this.isformenterUSerDetails=!this.isformenterUSerDetails;
  }

  login() {
    this.router.navigate(['/login']);
  }
}
