import { Component } from '@angular/core';

@Component({
  selector: 'app-containerstoremanager',
  templateUrl: './containerstoremanager.component.html',
  styleUrl: './containerstoremanager.component.css'
})
export class ContainerstoremanagerComponent {
  sideBarOpen = true; // Fixed the assignment, should be '=' not ':'

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
