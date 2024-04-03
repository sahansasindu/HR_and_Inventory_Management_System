import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidemenubarstoremanager',
  templateUrl: './sidemenubarstoremanager.component.html',
  styleUrl: './sidemenubarstoremanager.component.css'
})
export class SidemenubarstoremanagerComponent {
  constructor(private router: Router) {} // Inject Router
  logout() {

    this.router.navigate(['/login']);

  }


}
