import {Component, EventEmitter, Output} from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-hrm-header',
  templateUrl: './hrm-header.component.html',
  styleUrl: './hrm-header.component.css'
})
export class HrmHeaderComponent {

  @Output() toggleSidebarForMe = new EventEmitter<unknown>();

  constructor(){

  }


  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

}
