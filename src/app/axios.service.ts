import { Injectable } from '@angular/core';
import axios from 'axios';
@Injectable({
  providedIn: 'root'
})
export class AxiosService {

  constructor() {

    axios.defaults.baseURL = "http://localhost:8080/hrandproduction"
    axios.defaults.headers.post["Content-Type"] = "application/json"
  }

  request(method: string, url: string, data: any, headers: any): Promise<any> {
    return axios({method: method, url: url, data: data, headers: headers})
  }
  async getData(url: string, headers: any = {}): Promise<any> {
    try {
      const response = await axios.get(url, { headers });
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  async postData(url: string, data: any, headers: any = {}): Promise<any> {
    try {
      const response = await axios.post(url, data, { headers });
      return response.data;
    } catch (error) {
      console.error("Error posting data:", error);
      throw error;
    }
  }
  async putData(url: string, data: any, headers: any = {}): Promise<any> {
    try {
      const response = await axios.put(url, data, { headers });
      return response.data;
    } catch (error) {
      console.error("Error updating data:", error);
      throw error;
    }
  }

  async deleteData(url: string, headers: any = {}): Promise<any> {
    try {
      const response = await axios.delete(url, { headers });
      return response.data;
    } catch (error) {
      console.error("Error deleting data:", error);
      throw error;
    }
  }


}
