import { Component } from '@angular/core';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrl: './container.component.css'
})
export class ContainerComponent {


  sideBarOpen = true; // Fixed the assignment, should be '=' not ':'

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

}
