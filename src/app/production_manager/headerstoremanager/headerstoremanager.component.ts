import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../service/services/user.service";
import {AuthService} from "../../model/authservice/auth.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-headerstoremanager',
  templateUrl: './headerstoremanager.component.html',
  styleUrl: './headerstoremanager.component.css'
})

export class HeaderstoremanagerComponent implements OnInit {

  constructor(private userService:UserService, private authService:AuthService,private router: Router) {
      this.updateNewMailCount()


  }
  @Output() toggleSidebarForMe = new EventEmitter<unknown>();

  newMailCount: number=1;
  newMessageCount: number=1;
  newNotificationCount: number=1;


  updateNewMailCount() {
    this.newMailCount++;
    this.newMessageCount++;
    this.newNotificationCount++;
  }
  ngOnInit(): void {
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

  logout() {
    Swal.fire({
      title: 'Are you sure you want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'log out',
      cancelButtonText: 'cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout();
        this.userService.clearUser();
        this.router.navigate(['/login']);
      }
    });
  }



}
