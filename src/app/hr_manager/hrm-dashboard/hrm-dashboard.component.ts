import { Component, OnInit } from '@angular/core';
import {AxiosService} from "../../axios.service";

@Component({
  selector: 'app-hrm-dashboard',
  templateUrl: './hrm-dashboard.component.html',
  styleUrl: './hrm-dashboard.component.css'
})
export class HrmDashboardComponent implements OnInit {


  chartOptionsDep = {
    animationEnabled: true,
    title: {
      text: "Company Departments"
    },
    legend: {
      verticalAlign: "bottom",
      horizontalAlign: "center",
      fontSize: 13,
      fontFamily: "Helvetica",
      fontColor: "#000000",
      cursor: "pointer",
      itemTextFormatter: function(e: any) {
        return `${e.dataPoint.name}: ${e.dataPoint.y}`;
      },
      itemWrap: true
    },
    data: [{
      type: "pie",
      startAngle: -90,
      indexLabel: "{name}: {y}",
      yValueFormatString: "#,###",
      showInLegend: true,
      dataPoints: [] as { y: number, name: string }[]
    }]
  };

  selectedChart: string = 'departments';

  totalEmployees:number=0;

  departmentEmployeeCounts: DepartmentEmployeeCount[] = [];

  constructor(private ax:AxiosService) {}

  async ngOnInit() {

    await this.fetchTotalEmployeeCount();
    await this.fetchDepartmentEmployeeCounts();

  }

  cards = [
    { title: 'Company Total Employees', value: 0 },
    { title: 'Currently working Employees', value: 183 },
    { title: 'Today Absent Employees', value: 10 },
    { title: 'Currently Gate pass', value: 5 }
  ];

  async fetchTotalEmployeeCount(): Promise<void> {
    try {
      const response = await this.ax.request("GET", "/totalCount", {}, {});
      this.totalEmployees = response.data;
      this.cards[0].value = this.totalEmployees;
    } catch (error) {
      console.error('Error fetching total employee count:', error);
    }
  }

  async fetchDepartmentEmployeeCounts(): Promise<void> {
    try {
      const response = await this.ax.request("GET", "/employeeCountsByDepartments", {}, {});
      this.departmentEmployeeCounts = response.data;
      this.updateDepartmentChart();

    } catch (error) {
      console.error('Error fetching department employee counts:', error);
    }
  }

  updateDepartmentChart() {
    this.chartOptionsDep.data[0].dataPoints = this.departmentEmployeeCounts.map(department => ({
      y: department.employeeCount,
      name: department.departmentName,

    }));
  }


  chartOptionsEmp = {
    animationEnabled: true,
    title: {
      text: "Employee Status"
    },
    axisX: {
      labelAngle: 0
    },
    axisY: {
      title: "Number Of Male Employees"
    },
    axisY2: {
      title: "Number Of Female Employees"
    },
    toolTip: {
      shared: true,
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
      name: "Total male Employees",
      legendText: "Male",
      showInLegend: true,
      color: "#00caba",
      dataPoints:[
        {label: "Finance", y: 262},
        {label: "Human Resource", y: 211},
        {label: "Marketing", y: 175},
        {label: "Production", y: 137},
        {label: "Operating", y: 115},
        {label: "Sales", y: 104}
      ]
    }, {
      type: "column",
      name: "Total Female Employees",
      legendText: "Female",
      axisYType: "secondary",
      showInLegend: true,
      color: "#ef6f2a",
      dataPoints:[
        {label: "Finance", y: 100},
        {label: "Human Resource", y: 150},
        {label: "Marketing", y: 75},
        {label: "Production", y: 80},
        {label: "Operating", y: 90},
        {label: "Sales", y: 104}
      ]
    }]
  }

  showDepartmentsChart() {
    this.selectedChart = 'departments';
  }

  showEmployeesChart() {
    this.selectedChart = 'employees';
  }

}
interface DepartmentEmployeeCount {
  departmentName: string;
  employeeCount: number;
}
