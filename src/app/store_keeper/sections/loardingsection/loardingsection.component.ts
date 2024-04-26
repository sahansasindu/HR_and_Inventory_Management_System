import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {AgentService} from "../../../service/services/agent.service";
import {Agent} from "../../../model/agentmodel";

@Component({
  selector: 'app-loardingsection',
  templateUrl: './loardingsection.component.html',
  styleUrl: './loardingsection.component.css'
})
export class LoardingsectionComponent implements OnInit{
  constructor(private agentService:AgentService) {
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
  }



  isAddDetailsVisible: boolean = false; // Used to toggle the add details view
  isUpdateVisible: boolean = false; // Used to toggle the update view

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
}

export interface TableElement {
  loading_id: number;
  bottle_amount: number;
  batch_code: String;
  submit_date: Date;
  submit_time: Date;
  agent_id:String;

}

