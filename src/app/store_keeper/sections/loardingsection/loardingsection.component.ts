import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {AgentService} from "../../../service/services/agent.service";
import {Agent} from "../../../model/agentmodel";
import {AxiosService} from "../../../axios.service";

@Component({
  selector: 'app-loardingsection',
  templateUrl: './loardingsection.component.html',
  styleUrl: './loardingsection.component.css'
})
export class LoardingsectionComponent implements OnInit{


  isAddDetailsVisible: boolean = false; // Used to toggle the add details view
  isUpdateVisible: boolean = false; // Used to toggle the update view
  constructor(private axiosService: AxiosService,@Inject(PLATFORM_ID) private platformId: Object,private agentService:AgentService) {
  }

  displayedColumns: string[] = ['loading_id', 'bottle_amount','batch_code', 'submit_date', 'submit_time','agent_id',];
  dataSource1 = new MatTableDataSource<TableElement>([]);
  selectedRow: Element | null = null;
  // You will replace this with your actual data
  ELEMENT_DATA: TableElement[] = [

  ];

  displayedColumns2: string[] = ['agent_id', 'agent_name','agency_name', 'address', 'email','contact_number'];
  dataSource2 = new MatTableDataSource<Agent>([]);
  selectedRow2: Agent | null = null;
  ELEMENT_DATA_AGENT: Agent[] = [

  ];


  async ngOnInit() {

    this.dataSource1.data = this.ELEMENT_DATA;
    this.ELEMENT_DATA_AGENT=await this.agentService.getAllAgents();
    this.dataSource2.data=this.ELEMENT_DATA_AGENT;

  }

  selectRow(row: Element): void {
    this.selectedRow = row;
  }

  selectRow2(row2: Agent): void {
    this.selectedRow2 = row2;
    if(this.selectedRow2){
      (document.getElementById('agentID') as HTMLInputElement).value = this.selectedRow2.agent_id;
      this.closeAgent();
    }

  }

  //the method use for visible to the add details form
  toggleAddDetails(): void {
    this.isAddDetailsVisible = !this.isAddDetailsVisible;
    // Ensure update div is closed when opening add details
    if (this.isAddDetailsVisible) {
      this.isUpdateVisible = false;
    }
    if(!this.isAddDetailsVisible){
      this.closeAgent()
    }
  }

  toggleUpdate(): void {
    this.isUpdateVisible = !this.isUpdateVisible;
    // Ensure add details div is closed when opening update
    if (this.isUpdateVisible) {
      this.isAddDetailsVisible = false;
    }
    if(!this.isUpdateVisible){
      this.closeAgent()
    }
  }

  showAgentDetailsFlag: boolean = false;

  closeAgent(){

    this.showAgentDetailsFlag=false;
  }
  showAgentDetails() {
    // Set flag to true to show agent details div
    this.showAgentDetailsFlag = true;
  }

  async submitLordingDetails() {

    const token = localStorage.getItem('currentUser');
    const headers = {
      Authorization: `Bearer ${token}`
    };
    const milkBottlesAmount = (document.getElementById('milkBottlesAmount') as HTMLInputElement).value;
    const batchCode = (document.getElementById('batchCode') as HTMLInputElement).value;
    const date = (document.getElementById('date') as HTMLInputElement).value;
    const agentID = (document.getElementById('agentID') as HTMLInputElement).value;

    const milkBottles = parseInt(milkBottlesAmount);
    const getagentID = parseInt(agentID);

    // Early validation to ensure all fields are filled
    if (isNaN(milkBottles) || isNaN(getagentID) || date === "" || batchCode==="") {
      alert("Please Fill All Details");
      return;
    }

    const formDate = new Date((document.getElementById('date') as HTMLInputElement).value);
    const formattedDate = formDate.toISOString().split('T')[0]; // Gets 'YYYY-MM-DD'
    console.log(formattedDate)
    const currentTime = new Date();
    const formattedTime = currentTime.toTimeString().split(' ')[0]; // Gets 'HH:MM:SS'

    const formElement = new TableElement({
      bottle_amount: milkBottles,
      batch_code: batchCode,
      submit_date: formattedDate,
      submit_time: formattedTime,
      agent_id:getagentID
    });

    try {
      const response = await this.axiosService.request("POST", "/addLording", formElement, headers)
        .then(response => {

          if (response.data && response.data.message) {
            alert(response.data.message);
          } else {
            alert("Submission successful");
          }
        })
        .catch(error => {


          if (error.response && error.response.data && error.response.data.message) {
            alert(error.response.data.message);
          } else {
            alert("Submission Fail");
          }
        });
    } catch (error) {
      alert("Error submitting form");
      console.error('Error submitting form', error);
    }

  }

  //update changes

}

export class TableElement {
  loading_id: number=0;
  bottle_amount: number=0;
  batch_code: string='';
  submit_date: string='';
  submit_time: string='';
  agent_id:number=0;

  constructor(init?: Partial<TableElement>) {
    Object.assign(this, init);
  }

}

