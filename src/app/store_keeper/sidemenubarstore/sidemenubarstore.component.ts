import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidemenubarstore',
  templateUrl: './sidemenubarstore.component.html',
  styleUrl: './sidemenubarstore.component.css'
})
export class SidemenubarstoreComponent {
  constructor(private router: Router) {} // Inject Router
  logout() {

    this.router.navigate(['/login']);

  }
}
