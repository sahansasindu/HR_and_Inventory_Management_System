import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";



export interface Agent {
  agentId: string;
  agentaddress	:string;
  agaencyname	:string;
  agentname	:string;
  agentcontact	:string;
  agentmail:string;
  // Define other agent properties here
}


@Component({
  selector: 'app-manageagent',
  templateUrl: './manageagent.component.html',
  styleUrl: './manageagent.component.css'
})
export class ManageagentComponent implements OnInit{

  displayedColumns: string[] = ['agentId', 'agentaddress','agaencyname', 'agentname', 'agentcontact','agentmail',];
  dataSource = new MatTableDataSource<Agent>([]);
  // You will replace this with your actual data
  ELEMENT_DATA: Agent[] = [

    { agentId: "1", agentaddress: "kaluthara",agaencyname: "milk",agentname: "kawinda", agentcontact: "0771981995",agentmail:"xxx" },
    { agentId: "1", agentaddress: "kaluthara",agaencyname: "milk",agentname: "kawinda", agentcontact: "0771981995",agentmail:"xxx" },
    { agentId: "1", agentaddress: "kaluthara",agaencyname: "milk",agentname: "kawinda", agentcontact: "0771981995",agentmail:"xxx" },
    { agentId: "1", agentaddress: "kaluthara",agaencyname: "milk",agentname: "kawinda", agentcontact: "0771981995",agentmail:"xxx" },
    { agentId: "1", agentaddress: "kaluthara",agaencyname: "milk",agentname: "kawinda", agentcontact: "0771981995",agentmail:"xxx" },
    { agentId: "1", agentaddress: "kaluthara",agaencyname: "milk",agentname: "kawinda", agentcontact: "0771981995",agentmail:"xxx" },
    { agentId: "1", agentaddress: "kaluthara",agaencyname: "milk",agentname: "kawinda", agentcontact: "0771981995",agentmail:"xxx" },
    { agentId: "1", agentaddress: "kaluthara",agaencyname: "milk",agentname: "kawinda", agentcontact: "0771981995",agentmail:"xxx" },
    { agentId: "1", agentaddress: "kaluthara",agaencyname: "milk",agentname: "kawinda", agentcontact: "0771981995",agentmail:"xxx" },
    { agentId: "1", agentaddress: "kaluthara",agaencyname: "milk",agentname: "kawinda", agentcontact: "0771981995",agentmail:"xxx" },
    { agentId: "1", agentaddress: "kaluthara",agaencyname: "milk",agentname: "kawinda", agentcontact: "0771981995",agentmail:"xxx" },
    { agentId: "1", agentaddress: "kaluthara",agaencyname: "milk",agentname: "kawinda", agentcontact: "0771981995",agentmail:"xxx" },


    // ... more data
  ];
  isAddAgentVisible: boolean=false;
  isUpdateAgentVisible: boolean=false;
  isRemoveAgentVisible: boolean=false;
  isviweAgentVisible: boolean=false;

  chartOptions: any;

  ngOnInit() {
    this.dataSource.data = this.ELEMENT_DATA;
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
    this.isUpdateAgentVisible=!this.isUpdateAgentVisible;
    if(this.isUpdateAgentVisible){
      this.isAddAgentVisible=false;
      this.isRemoveAgentVisible=false;
      this.isviweAgentVisible=false;
    }
  }

  deleteAnget() {
    this.isRemoveAgentVisible=!this.isRemoveAgentVisible;
    if(this.isRemoveAgentVisible){
      this.isUpdateAgentVisible=false;
      this.isAddAgentVisible=false;
      this.isviweAgentVisible=false;
    }
  }

  viweagentboughtMilk() {
    this.isviweAgentVisible=!this.isviweAgentVisible;
    if(this.isviweAgentVisible){
      this.isUpdateAgentVisible=false;
      this.isRemoveAgentVisible=false;
      this.isAddAgentVisible=false;
    }
  }

  agentDetailsChart(){

    this.chartOptions = {
      animationEnabled: true,
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
}
