import { Component } from '@angular/core';

@Component({
  selector: 'app-containerstore',
  templateUrl: './containerstore.component.html',
  styleUrl: './containerstore.component.css'
})
export class ContainerstoreComponent {
  sideBarOpen = true; // Fixed the assignment, should be '=' not ':'

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

}
