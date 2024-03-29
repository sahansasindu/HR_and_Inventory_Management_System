import {Component, EventEmitter, Output,OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-headerstore',
  templateUrl: './headerstore.component.html',
  styleUrl: './headerstore.component.css'
})
export class HeaderstoreComponent implements OnInit{
  @Output() toggleSidebarForMe = new EventEmitter<unknown>();

  constructor(private router: Router) {}

  ngOnInit(): void {}

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }
}
