import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Agent} from "../../../model/agentmodel";
import {AgentService} from "../../../service/services/agent.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AxiosService} from "../../../axios.service";
import {CanvasJS} from "@canvasjs/angular-stockcharts";


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

  constructor(private agentService:AgentService,private axiosService:AxiosService) {

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

  displayedColumns: string[] = ['agent_id', 'agent_name','agency_name', 'address', 'email','contact_number'];
  dataSourceAgent = new MatTableDataSource<Agent>([]);
  selectedRow: Agent | null = null;


  selectRow(row: Agent): void {
    if (this.selectedRow === row) {
      this.selectedRow = null;
    } else {
      this.selectedRow = row;
    }

  }

  isAddAgentVisible: boolean=false;
  isUpdateAgentVisible: boolean=false;
  isRemoveAgentVisible: boolean=false;
  isviweAgentVisible: boolean=false;

  chartOptions: any;

  @ViewChild('agentIdChart') agentIdChart!: ElementRef;

  async ngOnInit() {

    this.dataSourceAgent.data = await this.agentService.getAllAgents();

    const currentYear = new Date().getFullYear();
    for (let year = currentYear - 10; year <= currentYear + 10; year++) {
      this.years.push(year);
    }
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
      alert("No row selected Please Select Row in Table")
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

    if(!this.isUpdateAgentVisible){
      this.selectedRow=null;
    }
  }

  deleteAnget() {

    if (!this.selectedRow) {
      alert("No row selected Please Select Row in Table")
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

    if(!this.isRemoveAgentVisible){
      this.selectedRow=null;
    }
  }

  //view for selected Agent Daily Milk Purchase Details
  months = [
    { value: 1, name: 'January' },
    { value: 2, name: 'February' },
    { value: 3, name: 'March' },
    { value: 4, name: 'April' },
    { value: 5, name: 'May' },
    { value: 6, name: 'June' },
    { value: 7, name: 'July' },
    { value: 8, name: 'August' },
    { value: 9, name: 'September' },
    { value: 10, name: 'October' },
    { value: 11, name: 'November' },
    { value: 12, name: 'December' }
  ];

  years: number[] = [];
  selectedMonth: number | null = null;
  selectedYear: number | null = null;


  viweagentboughtMilk() {

    if (!this.selectedRow) {
      alert("No row selected Please Select Row in Table")
      return;
    }

    this.isviweAgentVisible = !this.isviweAgentVisible;
    if (this.isviweAgentVisible) {
      this.isUpdateAgentVisible = false;
      this.isRemoveAgentVisible = false;
      this.isAddAgentVisible = false;
    }

    if(!this.isviweAgentVisible){
      this.selectedRow=null;
    }

    this.agentDetailsChart()

  }

  @ViewChild('agentNameChart') agentNameChart!: ElementRef;
  @ViewChild('agencyNameChart') agencyNameChart!: ElementRef;
  @ViewChild('addressChart') addressChart!: ElementRef;


  async searchPurchaseDetails(){

    if (!this.selectedMonth || !this.selectedYear) {
      alert('Please select both month and year.');
    } else {

      const agentId = this.agentIdChart.nativeElement.innerText;

      console.log(`Selected Month: ${this.selectedMonth}, Selected Year: ${this.selectedYear}`);

      console.log(`Agent ID: ${agentId}`);

      const url = `/getAgentPurchaseDetails/${agentId}/${this.selectedYear}/${this.selectedMonth}`;


      try {
        const response = await this.axiosService.request('GET', url, {}, {});
        console.log('Response data:', response);

        const data = response.data;

        if (Array.isArray(data)) {
          this.chartOptions.data[0].dataPoints = data.map((item: any) => {
            return { x: new Date(item.submit_date), y: item.amount };
          });
          this.renderChart();
        } else {
          console.error('Expected an array but got:', data);
          alert('Unexpected response format. Please try again later.');
        }
      } catch (error) {
        console.error('Error fetching purchase details:', error);
        alert('Failed to fetch purchase details');
      }


    }
  }

  agentDetailsChart() {
    this.chartOptions = {
      animationEnabled: true,
      exportEnabled: true,
      theme: "light2",
      title: {
        text: "Milk Purchase Details"
      },
      axisX: {
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
      toolTip: {
        shared: true
      },
      legend: {
        cursor: "pointer",
        verticalAlign: "bottom",
        horizontalAlign: "right",
        dockInsidePlotArea: true,
        itemclick: function(e: any) {
          if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
          } else {
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
        dataPoints: []
      }]
    };
  }
  renderChart() {
    const chart = new CanvasJS.Chart("chartContainer", this.chartOptions);
    chart.render();
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

  clearAgentDetails() {

    (document.getElementById('addAgentName') as HTMLInputElement).value='';
    (document.getElementById('addAgentAddress') as HTMLInputElement).value='';
    (document.getElementById('addAgencyName') as HTMLInputElement).value='';
    (document.getElementById('addContact') as HTMLInputElement).value='';
    (document.getElementById('addAgentEmail') as HTMLInputElement).value='';


  }

  clearUpdateDetails() {

    (document.getElementById('updateAgentName') as HTMLInputElement).value='';
    (document.getElementById('updateAgentAddress') as HTMLInputElement).value='';
    (document.getElementById('updateAgencyName') as HTMLInputElement).value='';
    (document.getElementById('updateContact') as HTMLInputElement).value='';
    (document.getElementById('updateAgentEmail') as HTMLInputElement).value='';


  }
}
