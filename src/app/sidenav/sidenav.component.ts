import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {
constructor(private router:Router) {
}
  backtologin() {
    this.router.navigate(['/login']).then(r => true);
  }
}
