// department-chart.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-department-chart',
  templateUrl: './department-chart.component.html',
  styleUrls: ['./department-chart.component.css'], // Include CanvasJSAngularChartsModule as provider
})
export class DepartmentChartComponent {
  chartOptions = {
    animationEnabled: true,
    title: {
      text: "DEPARTMENT"
    },
    data: [{
      type: "doughnut",
      indexLabel: "{name}",
      yValueFormatString: "##%'",
      dataPoints: [
        {y: 10, name: "Financial"},
        {y: 40, name: "Human Resources"},
        {y: 40, name: "Sales and Marketing"},
        {y: 10, name: "Administration"},
        {y: 20, name: "Quality Assurance"},
        {y: 80, name: "Production"}
      ]
    }]
  };
}
