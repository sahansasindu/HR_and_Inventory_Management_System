
// notification.component.ts
import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  @Input() message!: string;
  @Input() type: 'success' | 'error' | 'info' = 'info';

  constructor() {
    // Initialize message or leave it empty, depending on your logic
    // this.message = '';
  }
}
