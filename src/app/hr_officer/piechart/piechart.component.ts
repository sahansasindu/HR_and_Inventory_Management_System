import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

// Register the required Chart.js components
Chart.register(...registerables);

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrl: './piechart.component.css'
})
export class PiechartComponent {

  public chart: any;

  ngOnInit(): void {
    this.createChart();
  }

  createChart() {
    this.chart = new Chart("MyChart", {
      type: 'doughnut', // Change the type to 'doughnut' for a doughnut chart

      data: {
        labels: ['2022-05-10', '2022-05-11', '2022-05-12', '2022-05-13',
          '2022-05-14', '2022-05-15', '2022-05-16', '2022-05-17'],
        datasets: [
          {
            label: "Sales",
            data: [467, 576, 572, 79, 92, 574, 573, 576], // Update data to numeric values
            backgroundColor: ['blue', 'red', 'green', 'orange', 'purple', 'pink', 'brown', 'yellow'] // Assign colors to each data point
          }
        ]
      },
      options: {
        aspectRatio: 1, // Set aspect ratio for better appearance
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

}
