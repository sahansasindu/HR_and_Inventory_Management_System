import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Agent} from "../../../model/agentmodel";
import {ProductionIssue} from "../../../model/issuemodel";
import {AxiosService} from "../../../axios.service";

@Component({
  selector: 'app-manageissue',
  templateUrl: './manageissue.component.html',
  styleUrl: './manageissue.component.css'
})

export class ManageissueComponent implements data,OnInit{

  chart: any;
  isButtonVisible = false;
  isManageProductionIssues: boolean=false;

  constructor(private axiosService:AxiosService ) {
  }

  async ngOnInit() {
    await this.getIssueDetails();
  }

  displayedColumns: string[] = ['issue_id', 'issue_name', 'actions'];
  dataSourceIssue = new MatTableDataSource<ProductionIssue>([

  ]);

  ELEMENT_DATA_AGENT: ProductionIssue[] = [

  ];

  selectedRow: ProductionIssue | null = null;


  selectRow(row: ProductionIssue): void {
    this.selectedRow = row;
    console.log(this.selectedRow);

  }

  manageIssue() {

    this.isManageProductionIssues=!this.isManageProductionIssues;

  }

  async addNewIssue(): Promise<void> {

    const inputField = document.getElementById('addNewIssue') as HTMLInputElement;
    const issue_name = inputField.value;

    if (!issue_name) {
      inputField.focus();
      return;
    }

    try {
      await this.axiosService.request("POST", `/addNewIssue/${issue_name}`, {}, {})
        .then(response => {
          if (response.data && response.data.message) {
            alert(response.data.message);
          } else {
            alert("Submission successful");
            inputField.value='';
            this.getIssueDetails();
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

  async getIssueDetails():Promise<void>{

    try {
      const response = await this.axiosService.request('GET', '/getIssueDetails', {}, {});
      this.dataSourceIssue.data = response.data;
      this.ELEMENT_DATA_AGENT = this.dataSourceIssue.data;
      console.log('Issue Details fetched successfully:', response.data);
    } catch (error) {
      console.error('Error fetching Issue Details:', error);
    }

  }

  updateIssue(element:any) {

  }

  deleteIssue(element:any) {

  }

  visitorsChartDrilldownHandler = (e: any) => {
    this.chart.options = this.visitorsDrilldownedChartOptions;
    this.chart.options.data = this.options[e.dataPoint.name];
    this.chart.options.title = { text: e.dataPoint.name }
    this.chart.render();
    this.isButtonVisible = true;
  }

  visitorsDrilldownedChartOptions = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2",
    axisY: {
      gridThickness: 0,
      lineThickness: 1
    },
    data: []
  };

  newVSReturningVisitorsOptions = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2",
    title: {
      text: "Weekly Milk Production Issues"
    },
    subtitles: [{
      text: "Click on Any Segment to Drilldown",
      backgroundColor: "#2eacd1",
      fontSize: 16,
      fontColor: "white",
      padding: 5
    }],
    data: []
  };

  options: data = {
    "Weekly Milk Production Issues": [{
      type: "pie",
      name: "Weekly Milk Production Issues",
      startAngle: 90,
      cursor: "pointer",
      explodeOnClick: false,
      showInLegend: true,
      legendMarkerType: "square",
      click: this.visitorsChartDrilldownHandler,
      indexLabelPlacement: "inside",
      indexLabelFontColor: "white",
      dataPoints: [
        { y: 551160, name: "Issue One", color: "#058dc7", indexLabel: "40%" },
        { y: 329840, name: "Issue Two", color: "#50b432", indexLabel: "10%" },
        { y: 329840, name: "Issue Three", color: "#f5b633", indexLabel: "30%" },
        { y: 329840, name: "Issue Four", color: "#c22cff", indexLabel: "20%" }
      ]
    }],
    "Issue One": [{
      color: "#058dc7",
      name: "Issue One",
      type: "column",
      dataPoints: [
        { label: "first week Jan", y: 42600 },
        { label: "second week Jan", y: 44960 },
        { label: "third week Jan", y: 46160 },
        { label: "fourth week Jan", y: 48240 },
      ]
    }],
    "Issue Two": [{
      color: "#50b432",
      name: "Issue Two",
      type: "column",
      dataPoints: [
        { label: "first week Jan", y: 42600 },
        { label: "second week Jan", y: 44960 },
        { label: "third week Jan", y: 46160 },
        { label: "fourth week Jan", y: 48240 },
      ]
    }],
    "Issue Three": [{
      color: "#f5b633",
      name: "Issue Three",
      type: "column",
      dataPoints: [
        { label: "first week Jan", y: 42600 },
        { label: "second week Jan", y: 44960 },
        { label: "third week Jan", y: 46160 },
        { label: "fourth week Jan", y: 48240 },
      ]
    }],
    "Issue Four": [{
      color: "#c22cff",
      name: "Issue Four",
      type: "column",
      dataPoints: [
        { label: "first week Jan", y: 42600 },
        { label: "second week Jan", y: 44960 },
        { label: "third week Jan", y: 46160 },
        { label: "fourth week Jan", y: 48240 },
      ]
    }]
  };




  handleClick(event: Event) {
    this.chart.options = this.newVSReturningVisitorsOptions;
    this.chart.options.data = this.options["Weekly Milk Production Issues"];
    this.chart.render();
    this.isButtonVisible = false;
  }

  getChartInstance(chart: object) {
    this.chart = chart;
    this.chart.options = this.newVSReturningVisitorsOptions;
    this.chart.options.data = this.options["Weekly Milk Production Issues"];
    this.chart.render();
  }

}

export interface data {
  [key: string]: any;
}
