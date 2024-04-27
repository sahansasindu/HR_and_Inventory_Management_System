import {Component} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Agent} from "../../../model/agentmodel";
import {ProductionIssue} from "../../../model/issuemodel";

@Component({
  selector: 'app-manageissue',
  templateUrl: './manageissue.component.html',
  styleUrl: './manageissue.component.css'
})

export class ManageissueComponent implements data{

  chart: any;
  isButtonVisible = false;
  isManageProductionIssues: boolean=false;
  isaddNewIssue: boolean=false;
  isupdateIssue: boolean=false;
  isdeleteIssue: boolean=false;


  displayedColumns: string[] = ['issue_id', 'issue_name'];
  dataSourceIssue = new MatTableDataSource<ProductionIssue>([]);
  selectedRow: ProductionIssue | null = null;


  selectRow(row: ProductionIssue): void {
    this.selectedRow = row;
    console.log(this.selectedRow);

  }

  manageIssue() {

    this.isManageProductionIssues=!this.isManageProductionIssues;

  }

  visibleaddIssue() {

    this.isaddNewIssue=!this.isaddNewIssue;

    if(this.isaddNewIssue){
      this.isupdateIssue=false;
      this.isdeleteIssue=false;
    }
  }

  visibleupdateIssue() {

    this.isupdateIssue=!this.isupdateIssue;

    if(this.isupdateIssue){
      this.isaddNewIssue=false;
      this.isdeleteIssue=false;
    }

  }

  visibleDeleteIssue() {

    this.isdeleteIssue=!this.isdeleteIssue;

    if(this.isdeleteIssue){
      this.isupdateIssue=false;
      this.isaddNewIssue=false;
    }

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