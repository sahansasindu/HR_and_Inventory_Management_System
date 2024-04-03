import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-headerstoremanager',
  templateUrl: './headerstoremanager.component.html',
  styleUrl: './headerstoremanager.component.css'
})
export class HeaderstoremanagerComponent implements OnInit {
  @Output() toggleSidebarForMe = new EventEmitter<unknown>();

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }
}
