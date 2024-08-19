import { Injectable } from '@angular/core';
import axios, {AxiosError} from 'axios';
@Injectable({
  providedIn: 'root'
})
export class AxiosService {

  constructor() {
    axios.defaults.baseURL="http://luckylankahrandproduction.eu-north-1.elasticbeanstalk.com"
    axios.defaults.headers.post["Content-Type"]="application/json"
  }



  request(method:string,url:string,data:any,headers: any = {}):Promise<any>{

    return axios({
      method:method,
      url:url,
      data:data,
      headers: headers
    })
  }

  async request2(method: string, url: string, data?: any, config?: any): Promise<any> {
    const response = await axios({ method, url, data, ...config });
    return response;
  }

  isAxiosError(error: any): error is AxiosError {
    return (error as AxiosError).isAxiosError !== undefined;
  }

}
