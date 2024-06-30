import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hrm-dashboard',
  templateUrl: './hrm-dashboard.component.html',
  styleUrl: './hrm-dashboard.component.css'
})
export class HrmDashboardComponent implements OnInit {

  selectedChart: string = 'departments';


  constructor() {}

  ngOnInit() {
  }

  cards = [
    { title: 'Company Total Employees', value: 200 },
    { title: 'Currently working Employees', value: 183 },
    { title: 'Today Absent Employees', value: 10 },
    { title: 'Currently Gate pass', value: 5 }
  ];

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
      dataPoints: [
        { y: 34, name: "Finance" },
        { y: 23, name: "Human Resource" },
        { y: 75, name: "Marketing" },
        { y: 240, name: "Production" },
        { y: 80, name: "Operating" },
        { y: 35, name: "Sales" }
      ]
    }]
  };

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
      color: "#ec4040",
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
      color: "#003cff",
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
