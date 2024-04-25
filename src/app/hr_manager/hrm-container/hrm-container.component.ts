import { Component } from '@angular/core';

@Component({
  selector: 'app-hrm-container',
  templateUrl: './hrm-container.component.html',
  styleUrl: './hrm-container.component.css'
})
export class HrmContainerComponent {
  sideBarOpen = true; // Fixed the assignment, should be '=' not ':'

    sideBarToggler() {
      this.sideBarOpen = !this.sideBarOpen;
    }


}
