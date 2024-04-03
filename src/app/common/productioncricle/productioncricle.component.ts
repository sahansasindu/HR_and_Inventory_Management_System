import { Component, DoCheck, AfterViewChecked, ElementRef  } from '@angular/core';

@Component({
  selector: 'app-productioncricle',
  templateUrl: './productioncricle.component.html',
  styleUrl: './productioncricle.component.css'
})
export class ProductioncricleComponent implements AfterViewChecked , DoCheck{
  chart: any;
  width = "80%";
  widthChanged = false;
  prevWidth = "";

  getChartInstance(chart: object) {
    this.chart = chart;
    this.prevWidth = this.width;
  }

  resizeChart = (e:any, w:any) => {
    e.target.parentElement.childNodes.forEach((button:any) => {
      if(button.classList.contains("btn-success")) {
        button.classList.remove("btn-success");
        button.classList.add("btn-outline-success");
      }
    });
    e.target.classList.add("btn-success");
    e.target.classList.remove("btn-outline-success");
    this.width = w + '%';
  }

  ngDoCheck() {
    if(this.prevWidth != this.width && this.chart) {
      this.widthChanged = true;
    }
  }

  ngAfterViewChecked() {
    if(this.widthChanged && this.chart) {
      this.prevWidth = this.width;
      this.chart.render();
    }
  }

  chartOptions = {
    title: {
      text: "Current Bottle Stock Status"
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
        { label: "Empty Section", y: 3500 ,color: "rgba(10,160,220,0.8)"},
        { label: "Washing Section", y: 6000 ,color: "rgb(68,255,0)"},
        { label: "Production Section", y: 7000 ,color: "rgba(239,44,229,0.8)"},
        { label: "Loading Section", y: 5000 ,color: "rgba(76,255,174,0.8)"},
      ]
    }]
  }

}

