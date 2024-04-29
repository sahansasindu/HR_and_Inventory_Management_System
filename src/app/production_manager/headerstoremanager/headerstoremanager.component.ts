import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-headerstoremanager',
  templateUrl: './headerstoremanager.component.html',
  styleUrl: './headerstoremanager.component.css'
})
export class HeaderstoremanagerComponent implements OnInit {
  @Output() toggleSidebarForMe = new EventEmitter<unknown>();

  newMailCount: number=1;
  newMessageCount: number=1;
  newNotificationCount: number=1;

  updateNewMailCount() {
    this.newMailCount++;
    this.newMessageCount++;
    this.newNotificationCount++;
  }

  constructor(private router: Router) {
    this.updateNewMailCount()
  }

  ngOnInit(): void {
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }
}
