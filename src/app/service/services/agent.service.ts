import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Agent} from "../../model/agentmodel";
import {HttpClient} from "@angular/common/http";
import {AxiosService} from "../../axios.service";
import {isPlatformBrowser} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  private dataSource: any;


  constructor(private http: HttpClient,private axiosService: AxiosService,@Inject(PLATFORM_ID) private platformId: Object) {
    this.dataSource = {};
  }


  ELEMENT_DATA_AGENT: Agent[] = [

  ];

  //pass new agent details for database save
  async addAgent(agent: Agent): Promise<Agent> {

    const token = localStorage.getItem('currentUser');
    const headers = {
      Authorization: `Bearer ${token}`
    };
    console.log(agent)

    try {
      const response = await this.axiosService.request("POST", "/addNewAgent", {

        "agent_name":agent.agent_name,
        "agency_name":agent.agency_name,
        "address":agent.address,
        "email":agent.email,
        "contact_number":agent.contact_number

      }, headers)
        .then(response => {

          if (response.data && response.data.message) {
            alert(response.data.message);
          } else {

            alert("Registration successful");

          }
        })
        .catch(error => {

          if (error.response && error.response.data && error.response.data.message) {
            alert(error.response.data.message);
          } else {

          }
        });

    } catch (error) {

      alert("Error Registration form");
      console.error('Error Registration form', error);
    }
    return agent;
  }

  async deleteAgent(id: string, reason: string): Promise<void> {

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    const token = localStorage.getItem('currentUser');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    console.log("Token:", token);
    try {
      await this.axiosService.request('PATCH', `/deleteAgentDetails/${id}?deleteReason=${encodeURIComponent(reason)}`, {}, headers)
        .then(response => {
          if (response.data && response.data.message) {
            alert(response.data.message);
          } else {
            alert("Deletion successful");
          }
        })
        .catch(error => {
          if (error.response && error.response.data && error.response.data.message) {
            alert(error.response.data.message);
          } else {
            alert("An error occurred during deletion.");
          }
        });
    } catch (error) {
      alert("Error deleting agent");
      console.error('Error deleting agent:', error);
    }
  }


  async updateAgent(agent: Agent): Promise<Agent>{

    if (!isPlatformBrowser(this.platformId)) {
      return agent;
    }
    const token = localStorage.getItem('currentUser');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    try {
      const response = await this.axiosService.request('PUT', '/updateAgentDetails', {

        "agent_id":agent.agent_id,
        "agent_name":agent.agent_name,
        "agency_name":agent.agency_name,
        "address":agent.address,
        "email":agent.email,
        "contact_number":agent.contact_number
      }, headers)
        .then(response => {

          if (response.data && response.data.message) {
            alert(response.data.message);
          } else {

            alert("Update successful");

          }
        })
        .catch(error => {

          if (error.response && error.response.data && error.response.data.message) {
            alert(error.response.data.message);
          } else {

          }
        });
    } catch (error) {
      alert("Error Update Agent");
      console.error('Error Update Agent Details:', error);
    }

    return agent;
  }

 /* getAgentDetails(id: number): Observable<Agent> {
    return this.http.get<Agent>(`${this.apiUrl}/${id}`);
  }*/

  async getAllAgents(): Promise<Agent[]>  {
    if (!isPlatformBrowser(this.platformId)) {
      return this.ELEMENT_DATA_AGENT;
    }
    const token = localStorage.getItem('currentUser');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    try {
      const response = await this.axiosService.request('GET', '/getallAgentDetails', {}, headers);
      this.dataSource.data = response.data; // <-- This line is causing the error
      this.ELEMENT_DATA_AGENT = this.dataSource.data;
      console.log('Agent Details fetched successfully:', response.data);
    } catch (error) {
      console.error('Error fetching Agent Details:', error);
    }

    return this.ELEMENT_DATA_AGENT;
  }


  //undo agent details
  async undoDeleteAgent(agentId: string): Promise<void> {


    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    const token = localStorage.getItem('currentUser');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    console.log("Token:", token);

    try {
      await this.axiosService.request('PATCH', `/undoDeleteAgentDetails/${agentId}?`, {}, headers)
        .then(response => {

          if (response.data && response.data.message) {
            alert(response.data.message);
          } else {
            alert("Agent undeletion successful");
          }
        })
        .catch(error => {

          if (error.response && error.response.data && error.response.data.message) {
            alert(error.response.data.message);
          } else {
            alert("An error occurred during undeletion.");
          }
        });
    } catch (error) {
      alert("Error undeleting agent");
      console.error('Error undeleting agent:', error);
    }
  }

}
