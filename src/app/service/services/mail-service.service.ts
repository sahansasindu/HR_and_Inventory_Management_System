import { Injectable } from '@angular/core';
import {AxiosService} from "../../axios.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MailServiceService {

  constructor(private ax:AxiosService) {}

  async sendEmail(mailData:{to: string,subject:string,content:string}): Promise<Observable<any>>{

    return await this.ax.request('POST', '/sendmailToUser', mailData, {})

  }

}
