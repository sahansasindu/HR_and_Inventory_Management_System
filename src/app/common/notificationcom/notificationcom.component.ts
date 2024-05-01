import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-notificationcom',
  templateUrl: './notificationcom.component.html',
  styleUrl: './notificationcom.component.css'
})
export class NotificationcomComponent implements OnInit{

  currentTime: string='';
  private timeUpdateInterval: any;

  constructor() { }

  ngOnInit(): void {
    this.updateTime();
    this.timeUpdateInterval = setInterval(() => {
      this.updateTime();
    }, 1000); // Update time every second
  }

  ngOnDestroy(): void {
    if (this.timeUpdateInterval) {
      clearInterval(this.timeUpdateInterval); // Clear interval when component is destroyed
    }
  }

  private updateTime(): void {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString('en-US', { hour12: true }) +
      '<br/>' +
      now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }

  clearNotifications(): void {
    // Logic to clear notifications
  }

}
