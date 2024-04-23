import {Component, DoCheck, AfterViewChecked, ElementRef, OnInit} from '@angular/core';

@Component({
  selector: 'app-productioncricle',
  templateUrl: './productioncricle.component.html',
  styleUrl: './productioncricle.component.css'
})
export class ProductioncricleComponent{
  chart: any;
  width = "80%";
  prevWidth = "";


  getChartInstance(chart: object) {
    this.chart = chart;
    this.prevWidth = this.width;
  }

  chartOptions = {
    title: {
      text: "Current Bottle Stock"
    },
    theme: "light2",
    animationEnabled: true,
    exportEnabled: true,
    axisY: {
      includeZero: true,
      valueFormatString: ""
    },
    data: [{
      type: "column", //change type to bar, line, area, pie, etc
      yValueFormatString: "",
      dataPoints: [
        { label: "Washing Section", y: 6000 ,color: "rgb(68,255,0)"},
        { label: "Production Section", y: 7000 ,color: "rgba(239,44,229,0.8)"},
        { label: "Loading Section", y: 5000 ,color: "rgba(76,255,174,0.8)"},
      ]
    }]
  }

}

