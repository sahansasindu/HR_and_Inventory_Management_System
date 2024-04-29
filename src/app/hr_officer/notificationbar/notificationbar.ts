import { Component } from '@angular/core';

@Component({
  selector: 'app-notificationbar',
  templateUrl: './notificationbar.html',
  styleUrls: ['./notificationbar.css']
})
export class Notificationbar {
  currentDate: Date = new Date();

  notifications: { message: string, type: 'success' | 'error' | 'info' }[] = [];

  addSuccessNotification(message: string) {
    this.notifications.push({ message, type: 'success' });
  }

  addErrorNotification(message: string) {
    this.notifications.push({ message, type: 'error' });
  }

  addInfoNotification(message: string) {
    this.notifications.push({ message, type: 'info' });
  }

  clearNotifications() {
    this.notifications = [];
  }
}

/*

currentDate: Date = new Date();

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    // Update currentDate every second (1000 milliseconds)
    interval(1000).subscribe(() => {
      this.currentDate = new Date();
      this.cdr.detectChanges(); // Trigger change detection
    });
  }
 */
