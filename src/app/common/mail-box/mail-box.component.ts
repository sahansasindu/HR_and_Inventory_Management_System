import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import {HttpClient,HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-mail-box',
  templateUrl: './mail-box.component.html',
  styleUrl: './mail-box.component.css'
})
export class MailBoxComponent {
  constructor(private authService: MsalService, private httpClient: HttpClient) {}

  login() {
    this.authService.loginPopup()
      .subscribe({
        next: (result) => {
          console.log('User logged in', result);
        },
        error: (error) => console.log(error)
      });
  }

  getTokenAndCallApi() {
    const requestObj = {
      scopes: ["Mail.Read"]
    };

    this.authService.acquireTokenSilent(requestObj).subscribe({
      next: (response) => {
        this.callOutlookApi(response.accessToken);
      },
      error: (error) => {
        console.log(error);
        this.authService.acquireTokenPopup(requestObj).subscribe({
          next: (response) => {
            this.callOutlookApi(response.accessToken);
          }
        });
      }
    });
  }

  callOutlookApi(token: string) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ${token}');
    this.httpClient.get('https://graph.microsoft.com/v1.0/me/messages', { headers })
      .subscribe({
        next: (result) => console.log(result),
        error: (error) => console.log(error)
      });
  }
}
