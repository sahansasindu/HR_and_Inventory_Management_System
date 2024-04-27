
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { AxiosService } from '../../axios.service';
import { Router } from '@angular/router';


// Register the required Chart.js components
Chart.register(...registerables);

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent implements OnInit {
  public chart: any;

 // salaryheader: any[] = [];
  //salaryheader2: any[] = [];
 // selectedDepartment: string = "";
  isLoading: boolean = false;
  loandata: any[] = [];

  constructor(private axiosService: AxiosService, private router: Router, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.createChart();
    this.fetchDeductionData();

  }

  createChart() {
    this.chart = new Chart("MyChart", {
      type: 'doughnut', // Change the type to 'doughnut' for a doughnut chart

      data: {
        labels: ['Financial', 'Human resource', 'Sell & marketing', 'Administration',
          'Quality assurance', 'Production'],
        datasets: [
          {
            label: "Employees",
            data: this.loandata.map(item => item[1]), // Use the length of each array as data
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

  fetchDeductionData() {
    this.isLoading = true;
    this.axiosService.request('GET', 'employeeCountByDepartment', null,{})
      .then(response => {
        console.log('Fetched data:', response.data); // Log the fetched data
        //this.salaryheader2 = response.data;
        this.loandata = response.data;
        this.isLoading = false;
        // Update Invoiceheader with the fetched data
        console.log(this.loandata); // Corrected logging statement

        // Update the chart after fetching data
        if (this.chart) {
          this.chart.data.datasets[0].data = this.loandata.map(item => item[1]);
          this.chart.update();
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
}
