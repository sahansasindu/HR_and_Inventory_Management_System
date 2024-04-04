import {Component} from '@angular/core';

@Component({
  selector: 'app-manageissue',
  templateUrl: './manageissue.component.html',
  styleUrl: './manageissue.component.css'
})

export class ManageissueComponent implements data{

  chart: any;
  isButtonVisible = false;

  visitorsChartDrilldownHandler = (e: any) => {
    this.chart.options = this.visitorsDrilldownedChartOptions;
    this.chart.options.data = this.options[e.dataPoint.name];
    this.chart.options.title = { text: e.dataPoint.name }
    this.chart.render();
    this.isButtonVisible = true;
  }

  visitorsDrilldownedChartOptions = {
    animationEnabled: true,
    theme: "light2",
    axisY: {
      gridThickness: 0,
      lineThickness: 1
    },
    data: []
  };

  newVSReturningVisitorsOptions = {
    animationEnabled: true,
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
        { y: 551160, name: "New Visitors", color: "#058dc7", indexLabel: "40%" },
        { y: 329840, name: "Returning Visitors", color: "#50b432", indexLabel: "10%" },
        { y: 329840, name: "Key Visitors", color: "#f5b633", indexLabel: "30%" },
        { y: 329840, name: "False Visitors", color: "#c22cff", indexLabel: "20%" }
      ]
    }],
    "New Visitors": [{
      color: "#058dc7",
      name: "New Visitors",
      type: "column",
      dataPoints: [
        { label: "first week Jan", y: 42600 },
        { label: "second week Jan", y: 44960 },
        { label: "third week Jan", y: 46160 },
        { label: "fourth week Jan", y: 48240 },
      ]
    }],
    "Returning Visitors": [{
      color: "#50b432",
      name: "Returning Visitors",
      type: "column",
      dataPoints: [
        { label: "first week Jan", y: 42600 },
        { label: "second week Jan", y: 44960 },
        { label: "third week Jan", y: 46160 },
        { label: "fourth week Jan", y: 48240 },
      ]
    }],
    "Key Visitors": [{
      color: "#f5b633",
      name: "Key Visitors",
      type: "column",
      dataPoints: [
        { label: "first week Jan", y: 42600 },
        { label: "second week Jan", y: 44960 },
        { label: "third week Jan", y: 46160 },
        { label: "fourth week Jan", y: 48240 },
      ]
    }],
    "False Visitors": [{
      color: "#c22cff",
      name: "False Visitors",
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
