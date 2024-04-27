import { Component } from '@angular/core';

@Component({
  selector: 'app-managebottledamage',
  templateUrl: './managebottledamage.component.html',
  styleUrl: './managebottledamage.component.css'
})
export class ManagebottledamageComponent {

  chartOptions = {
    animationEnabled: true,
    exportEnabled: true,
    title: {
      text: "Weekly Bottle Damage Status"
    },
    axisX: {
      labelAngle: -90
    },
    axisY: {
      title: "Number Of Bottles"
    },
    toolTip: {
      shared: true
    },
    legend:{
      cursor:"pointer",
      itemclick: function(e: any){
        if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
          e.dataSeries.visible = false;
        }
        else {
          e.dataSeries.visible = true;
        }
        e.chart.render();
      }
    },
    data: [{
      type: "column",
      name: "Washing Section",
      legendText: "Washing Section",
      color: "#6fa9af",
      showInLegend: true,
      dataPoints:[
        {label: "First Week", y: 45},
        {label: "Second Week", y: 23},
        {label: "Third Week", y: 88},
        {label: "Fourth Week", y: 42},
      ]
    }, {
      type: "column",
      name: "Production Section",
      legendText: "Production Section",
      color: "rgba(0,94,255,0.73)",
      showInLegend: true,
      dataPoints:[
        {label: "First Week", y: 25},
        {label: "Second Week", y: 30},
        {label: "Third Week", y: 40},
        {label: "Fourth Week", y: 70},
      ]
    }]
  }

}
