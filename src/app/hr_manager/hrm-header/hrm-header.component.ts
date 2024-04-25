import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hrm-header',
  templateUrl: './hrm-header.component.html',
  styleUrl: './hrm-header.component.css'
})
export class HrmHeaderComponent implements OnInit{

  @Output() toggleSidebarForMe = new EventEmitter<unknown>();

  constructor(private router: Router) {}

  ngOnInit(): void {}

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }
}
