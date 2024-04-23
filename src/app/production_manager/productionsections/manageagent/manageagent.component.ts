import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Agent} from "../../../model/agentmodel";
import {AgentService} from "../../../service/services/agent.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-manageagent',
  templateUrl: './manageagent.component.html',
  styleUrl: './manageagent.component.css'
})
export class ManageagentComponent implements OnInit{

  updateFormAgent : FormGroup;
  deleteFormAgent:FormGroup;
  showUndoOption: boolean = false;
  undoRequested: boolean = false;
  undoTimeout: any;

  currentAgentIdForDeletion: string | null = null;

  constructor(private agentService:AgentService) {

    this.updateFormAgent = new FormGroup({
      updateAgentId: new FormControl({value: '', disabled: true},Validators.required),
      updateAgentName: new FormControl(''),
      updateAgentAddress: new FormControl(''),
      updateAgencyName: new FormControl(''),
      updateContact: new FormControl(''),
      updateAgentEmail: new FormControl('')
    });

    this.deleteFormAgent = new FormGroup({
      remo_agent_id: new FormControl({value: '', disabled: true},Validators.required),
      remo_agent_name: new FormControl({value: '', disabled: true},Validators.required),
      remo_address: new FormControl({value: '', disabled: true},Validators.required),
      remo_agency_name:new FormControl({value: '', disabled: true},Validators.required),
      remo_contact_number: new FormControl({value: '', disabled: true},Validators.required),
      remo_email: new FormControl({value: '', disabled: true},Validators.required),
      reason_status: new FormControl('')
    });
  }

  displayedColumns: string[] = ['agent_id', 'agent_name','agency_name', 'address', 'email','contact_number',];
  dataSourceAgent = new MatTableDataSource<Agent>([]);
  selectedRow: Agent | null = null;


  selectRow(row: Agent): void {
    this.selectedRow = row;
    console.log(this.selectedRow);

  }

  isAddAgentVisible: boolean=false;
  isUpdateAgentVisible: boolean=false;
  isRemoveAgentVisible: boolean=false;
  isviweAgentVisible: boolean=false;

  chartOptions: any;

  async ngOnInit() {

    this.dataSourceAgent.data = await this.agentService.getAllAgents();
    this.agentDetailsChart();
  }

  registerNewAnget() {
    this.isAddAgentVisible=!this.isAddAgentVisible;
    if(this.isAddAgentVisible){
      this.isUpdateAgentVisible=false;
      this.isRemoveAgentVisible=false;
      this.isviweAgentVisible=false;
    }
  }

  updateAnget() {

    if (!this.selectedRow) {
      alert("No row selected")
      return;
    }

    this.updateFormAgent.setValue({
      updateAgentId:this.selectedRow.agent_id,
      updateAgentName:this.selectedRow.agent_name,
      updateAgentAddress:this.selectedRow.address,
      updateAgencyName:this.selectedRow.agency_name,
      updateContact:this.selectedRow.contact_number,
      updateAgentEmail:this.selectedRow.email
  });

    this.isUpdateAgentVisible=!this.isUpdateAgentVisible;
    if(this.isUpdateAgentVisible){
      this.isAddAgentVisible=false;
      this.isRemoveAgentVisible=false;
      this.isviweAgentVisible=false;
    }
  }

  deleteAnget() {

    if (!this.selectedRow) {
      alert("No row selected")
      return;
    }

    this.deleteFormAgent.setValue({
      remo_agent_id:this.selectedRow.agent_id,
      remo_agent_name:this.selectedRow.agent_name,
      remo_address:this.selectedRow.address,
      remo_agency_name:this.selectedRow.agency_name,
      remo_contact_number:this.selectedRow.contact_number,
      remo_email:this.selectedRow.email,
      reason_status:this.selectedRow.deleteReason
    });

    this.isRemoveAgentVisible=!this.isRemoveAgentVisible;
    if(this.isRemoveAgentVisible){
      this.isUpdateAgentVisible=false;
      this.isAddAgentVisible=false;
      this.isviweAgentVisible=false;
    }
  }

  viweagentboughtMilk() {
    this.isviweAgentVisible = !this.isviweAgentVisible;
    if (this.isviweAgentVisible) {
      this.isUpdateAgentVisible = false;
      this.isRemoveAgentVisible = false;
      this.isAddAgentVisible = false;
    }
  }

  agentDetailsChart(){

    this.chartOptions = {
      animationEnabled: true,
      exportEnabled: true,
      theme: "light2",
      title:{
        text: "Milk Purchase Details"
      },
      axisX:{
        valueFormatString: "DD MMM",
        crosshair: {
          enabled: true,
          snapToDataPoint: true
        }
      },
      axisY: {
        title: "Number of Milk Bottles",
        crosshair: {
          enabled: true
        }
      },
      toolTip:{
        shared:true
      },
      legend:{
        cursor: "pointer",
        verticalAlign: "bottom",
        horizontalAlign: "right",
        dockInsidePlotArea: true,
        itemclick: function(e: any) {
          if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
          } else{
            e.dataSeries.visible = true;
          }
          e.chart.render();
        }
      },
      data: [{
        type: "line",
        showInLegend: true,
        name: "Purchased",
        lineDashType: "dash",
        markerType: "square",
        xValueFormatString: "DD MMM, YYYY",
        dataPoints: [
          { x: new Date(2022, 0, 3), y: 650 },
          { x: new Date(2022, 0, 4), y: 700 },
          { x: new Date(2022, 0, 5), y: 710 },
          { x: new Date(2022, 0, 6), y: 658 },
          { x: new Date(2022, 0, 7), y: 734 },
          { x: new Date(2022, 0, 8), y: 963 },
          { x: new Date(2022, 0, 9), y: 847 },
          { x: new Date(2022, 0, 10), y: 853 },
          { x: new Date(2022, 0, 11), y: 869 },
          { x: new Date(2022, 0, 12), y: 943 },
          { x: new Date(2022, 0, 13), y: 970 },
          { x: new Date(2022, 0, 14), y: 869 },
          { x: new Date(2022, 0, 15), y: 890 },
          { x: new Date(2022, 0, 16), y: 930 }
        ]
      },
        {
          type: "line",
          showInLegend: true,
          name: "Empty",
          lineDashType: "dot",
          dataPoints: [
            { x: new Date(2022, 0, 3), y: 650 },
            { x: new Date(2022, 0, 4), y: 700 },
            { x: new Date(2022, 0, 5), y: 710 },
            { x: new Date(2022, 0, 6), y: 658 },
            { x: new Date(2022, 0, 7), y: 734 },
            { x: new Date(2022, 0, 8), y: 963 },
            { x: new Date(2022, 0, 9), y: 847 },
            { x: new Date(2022, 0, 10), y: 853 },
            { x: new Date(2022, 0, 11), y: 700 },
            { x: new Date(2022, 0, 12), y: 943 },
            { x: new Date(2022, 0, 13), y: 970 },
            { x: new Date(2022, 0, 14), y: 869 },
            { x: new Date(2022, 0, 15), y: 890 },
            { x: new Date(2022, 0, 16), y: 800 }
          ]
        }]
    }
  }


  //this method for add new agent to system
  async addNewAgent() {

    let agent=new Agent();
    agent.agent_name=(document.getElementById('addAgentName') as HTMLInputElement).value;
    agent.agency_name=(document.getElementById('addAgencyName') as HTMLInputElement).value;
    agent.address=(document.getElementById('addAgentAddress') as HTMLInputElement).value;
    agent.email=(document.getElementById('addAgentEmail') as HTMLInputElement).value;
    agent.contact_number=(document.getElementById('addContact') as HTMLInputElement).value;

    if(agent.agent_name==="" || agent.agency_name==="" || agent.address==="" || agent.email==="" || agent.contact_number===""){
      alert("Please Fill All Details")
      return;
    }
    if(!agent.isValidEmail()){
      alert("Please Enter Valid Email")
      return;
    }
    if(!agent.isValidPhoneNumber()){
      alert("Please Enter Valid Mobile NUmber")
      return;
    }
    if (agent.contact_number.length<10){
      alert("Invalid Phone Number")
      return;
    }

    try {
      await this.agentService.addAgent(agent);
      await this.ngOnInit();

    }catch (error){

      alert(error)

    }
  }

  async updateAgentDetails() {

    let updatedAgent = new Agent();

    updatedAgent.agent_id=this.updateFormAgent.get("updateAgentId")?.value;
    updatedAgent.agent_name=this.updateFormAgent.get("updateAgentName")?.value;
    updatedAgent.address=this.updateFormAgent.get("updateAgentAddress")?.value;
    updatedAgent.agency_name = this.updateFormAgent.get("updateAgencyName")?.value;
    updatedAgent.contact_number = this.updateFormAgent.get("updateContact")?.value;
    updatedAgent.email = this.updateFormAgent.get("updateAgentEmail")?.value;

    if(updatedAgent.agent_id=="" || updatedAgent.agent_name==="" || updatedAgent.address==="" || updatedAgent.agency_name==="" || updatedAgent.contact_number==="" || updatedAgent.email===""){
      alert("Please Fill All Details")
      return;
    }
    if(!updatedAgent.isValidEmail()){
      alert("Please Enter Valid Email")
      return;
    }
    if(!updatedAgent.isValidPhoneNumber()){
      alert("Please Enter Valid Mobile NUmber")
      return;
    }
    if (updatedAgent.contact_number.length<10){
      alert("Invalid Phone Number")
      return;
    }

    try {
      await this.agentService.updateAgent(updatedAgent);
      await this.ngOnInit();
      console.log(updatedAgent);

    }catch (error){

      alert(error)

    }
  }

  //this method implement for get agent details within undo opting to delete agent in the system
  async deleteAgentDetails() {


    let deletedAgent = new Agent();

    deletedAgent.agent_id=this.deleteFormAgent.get("remo_agent_id")?.value;
    deletedAgent.deleteReason=this.deleteFormAgent.get("reason_status")?.value;

    if(deletedAgent.deleteReason===null){
      alert("Please Should Enter Valid Reason...")
      return;
    }
    this.currentAgentIdForDeletion = deletedAgent.agent_id;

    // Display the undo option in the form
    this.showUndoOption = true;
    this.undoRequested = false;

    // Set a timeout for the actual deletion
    this.undoTimeout = setTimeout(async () => {
      if (!this.undoRequested && this.currentAgentIdForDeletion) {
        try {
          await this.agentService.deleteAgent(this.currentAgentIdForDeletion, deletedAgent.deleteReason);

          await this.ngOnInit();
        } catch (error) {
          console.error('Error deleting agent:', error);
          alert("Error deleting agent");
        }
      }
      this.showUndoOption = false;
      this.currentAgentIdForDeletion = null;
    }, 10000);
  }

  async undoDelete() {

    clearTimeout(this.undoTimeout);
    this.undoRequested = true;

    if (this.currentAgentIdForDeletion) {
      try {
        await this.agentService.undoDeleteAgent(this.currentAgentIdForDeletion);
        await this.ngOnInit();
      } catch (error) {
        console.error('Error undoing agent deletion:', error);
        alert("Error undoing deletion");
      }
      this.showUndoOption = false;
      this.currentAgentIdForDeletion = null;
    }
  }
}
