import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AxiosService {

  constructor() {
    axios.defaults.baseURL="http://localhost:8080/hrandproduction"
    axios.defaults.headers.post["Content-Type"]="application/json"
  }

  getAttendance(): Promise<any> {
    return axios.get('/getAttendance');
  }

  addAttendance(data: any): Promise<any> {
    return axios.post('/addAttendance', data);
  }

  getEmployeeCountByDate(date: string): Promise<any> {
    return axios.get(`/employeeCount?date=${date}`);
  }


  request(method:string,url:string,data:any = null ,headers: any = {}):Promise<any>{
    return axios({
      method:method,
      url:url,
      data:data,
      headers: headers
    });
  }

  // Fetch medical details
  getMedical(): Promise<any> {
    return this.request("GET", "/getmedical");
  }

  // Fetch leave details (you'll need to implement this on the backend)
  getLeave(): Promise<any> {
    return this.request("GET", "/getLeave");
  }
}

