import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {AgentService} from "../../../service/services/agent.service";
import {Agent} from "../../../model/agentmodel";
import {AxiosService} from "../../../axios.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-loardingsection',
  templateUrl: './loardingsection.component.html',
  styleUrl: './loardingsection.component.css'
})
export class LoardingsectionComponent implements OnInit{


  updateForm: FormGroup;


  isAddDetailsVisible: boolean = false; // Used to toggle the add details view
  isUpdateVisible: boolean = false; // Used to toggle the update view
  constructor(private axiosService: AxiosService,@Inject(PLATFORM_ID) private platformId: Object,private agentService:AgentService) {

    this.updateForm = new FormGroup({
      lodingBottlesupdate: new FormControl({value: '', disabled: true},Validators.required),
      updateAmount: new FormControl(''),
      batchCodeupdate: new FormControl(''),
      dateUpdate: new FormControl(''),
      agentIDupdate: new FormControl('')
    });
  }

  displayedColumns: string[] = ['loading_id', 'amount','batch_code', 'submit_date', 'submit_time','ag_id',];
  dataSource1 = new MatTableDataSource<TableElement>([]);
  selectedRow: TableElement | null = null;
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
    await this.fetchLoridingDetails();

  }

  selectRow(row: TableElement): void {
    if (this.selectedRow === row) {
      this.selectedRow = null;
    } else {
      this.selectedRow = row;
    }
  }

  selectRow2(row2: Agent): void {

    if(this.isAddDetailsVisible){
      this.selectedRow2 = row2;
      if(this.selectedRow2){
        (document.getElementById('agentID') as HTMLInputElement).value = this.selectedRow2.agent_id;
        this.closeAgent();
      }
    }
    else if(this.isUpdateVisible){
      this.selectedRow2 = row2;
      if(this.selectedRow2){
        (document.getElementById('agentIDupdate') as HTMLInputElement).value = this.selectedRow2.agent_id;
        this.closeAgent();
      }
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

  formatDateForInput(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toISOString().split('T')[0];
  }

  toggleUpdate(): void {
    if (!this.selectedRow) {
      alert("No row selected Please Seclet Row in Table")
      return;
    }

    const formattedDate = this.formatDateForInput(this.selectedRow.submit_date);

    this.updateForm.setValue({
      lodingBottlesupdate:this.selectedRow.loading_id,
      updateAmount:this.selectedRow.amount,
      batchCodeupdate:this.selectedRow.batch_code,
      dateUpdate:formattedDate,
      agentIDupdate:this.selectedRow.ag_id
    });


    this.isUpdateVisible = !this.isUpdateVisible;

    if (this.isUpdateVisible) {
      this.isAddDetailsVisible = false;
    }
    if(!this.isUpdateVisible){
      this.closeAgent()
    }
    if(!this.isUpdateVisible){
      this.selectedRow=null;
    }
  }

  showAgentDetailsFlag: boolean = false;

  closeAgent(){

    this.showAgentDetailsFlag=false;
  }
  showAgentDetails() {
    // Set table to true to show agent details div
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
      amount: milkBottles,
      batch_code: batchCode,
      submit_date: formattedDate,
      submit_time: formattedTime,
      ag_id:getagentID
    });
    console.log(formElement)
    try {
        await this.axiosService.request("POST", "/addLording", formElement, headers)
        .then(response => {

          if (response.data && response.data.message) {
            alert(response.data.message);
          } else {
            alert("Submission successful");
            this.fetchLoridingDetails();
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

  // get Lording Details
  async fetchLoridingDetails() {

    try {
      const response = await this.axiosService.request('GET', '/getAllLoading', {}, {});
      this.dataSource1.data = response.data;
      //console.log(response.data)
      this.ELEMENT_DATA=this.dataSource1.data;
      //console.log('Lording details fetched successfully:', response.data);
    } catch (error) {
      //console.error('Error fetching Lording details:', error);
    }
  }

  //update changes



  async updateLordingChanges() {

    const formData = this.updateForm.getRawValue();


    try {

      const updatedTableElement = new TableElement();

      updatedTableElement.loading_id=formData.lodingBottlesupdate;
      updatedTableElement.amount=formData.updateAmount;
      updatedTableElement.batch_code=formData.batchCodeupdate;
      updatedTableElement.submit_date=formData.dateUpdate;
      updatedTableElement.ag_id=formData.agentIDupdate;
      const currentTime = new Date();

      updatedTableElement.submit_time=currentTime.toTimeString().split(' ')[0];
      console.log(updatedTableElement)
      const response = await this.axiosService.request('PUT', '/updateLording', updatedTableElement, {})
        .then(response => {

          if (response.data && response.data.message) {
            alert(response.data.message);
          } else {
            alert("Update successful")
            console.log('Update successful', response);
            this.fetchLoridingDetails();
          }
        })
        .catch(error => {
          if (error.response && error.response.data && error.response.data.message) {
            alert(error.response.data.message);
          } else {
            alert("An error occurred while Updating  Details.");
          }
        });
    } catch (error) {
      alert("Error updating details")
      console.error('Error updating details', error);

    }
  }


}

export class TableElement {
  loading_id: number=0;
  amount: number=0;
  batch_code: string='';
  submit_date: string='';
  submit_time: string='';
  ag_id:number=0;

  constructor(init?: Partial<TableElement>) {
    Object.assign(this, init);
  }

}

