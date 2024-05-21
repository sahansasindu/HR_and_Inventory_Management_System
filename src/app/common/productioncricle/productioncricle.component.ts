import {Component, OnInit} from '@angular/core';
import {AxiosService} from "../../axios.service";

@Component({
  selector: 'app-productioncricle',
  templateUrl: './productioncricle.component.html',
  styleUrl: './productioncricle.component.css'
})
export class ProductioncricleComponent implements OnInit{
  chart: any;
  width = "80%";
  prevWidth = "";

  constructor(private ax:AxiosService) {

  }

  async ngOnInit() {
    await this.getCurrentStatus();
  }

  async getCurrentStatus() {

    const response = await this.ax.request("GET","/getCurrentBottleStock",{},{});
    this.updateChart(response.data);
    console.log(response.data)


  }

  updateChart(status: CurrentBottleStatus): void {
    this.chartOptions.data[0].dataPoints = [
      { label: "Washing Section", y: status.woshing, color: "rgb(68,255,0)" },
      { label: "Production Section", y: status.production, color: "rgba(239,44,229,0.8)" },
      { label: "Loading Section", y: status.lording, color: "rgba(76,255,174,0.8)" }
    ];

    if (this.chart) {
      this.chart.render();
    }
  }


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
        { label: "Washing Section", y: 0, color: "rgb(68,255,0)" },
        { label: "Production Section", y: 0, color: "rgba(239,44,229,0.8)" },
        { label: "Loading Section", y: 0, color: "rgba(76,255,174,0.8)" }
      ]
    }]
  }

  async refreshChart() {
    await this.ngOnInit()
  }
}

interface CurrentBottleStatus {
  woshing: number;
  production: number;
  lording: number;
}
