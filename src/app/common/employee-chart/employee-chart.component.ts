// employee-chart.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-employee-chart',
  templateUrl: './employee-chart.component.html',
  styleUrls: ['./employee-chart.component.css'],
  // Include CanvasJSAngularChartsModule as provider
})
export class EmployeeChartComponent {
  chartOptions = {
    animationEnabled: true,
    title:{
      text: "Angular Column Chart"
    },
    data: [{
      type: "column",
      dataPoints: [
        { x: 10, y: 71 },
        { x: 20, y: 55 },
        { x: 30, y: 50 },
        { x: 40, y: 65 },
        { x: 50, y: 95 },
        { x: 60, y: 68 },
        { x: 70, y: 28 },
        { x: 80, y: 34 },
        { x: 90, y: 14 }
      ]
    }]
  };
}
