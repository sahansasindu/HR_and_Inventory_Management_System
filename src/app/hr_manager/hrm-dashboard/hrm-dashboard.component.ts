import {Component, OnInit} from '@angular/core';
import {AxiosService} from "../../axios.service";

@Component({
  selector: 'app-hrm-dashboard',
  templateUrl: './hrm-dashboard.component.html',
  styleUrl: './hrm-dashboard.component.css'
})
export class HrmDashboardComponent implements OnInit{


  chartDep: any;

  chartEmp: any;

  chartOptionsEmp = {
    animationEnabled: true,
    title: {
      text: "Employee Status"
    },
    axisX: {
      labelAngle: 0
    },
    axisY: {
      title: "Number Of Male Employees",
    },
    axisY2: {
      title: "Number Of Female Employees",
    },
    toolTip: {
      shared: true,
    },
    legend: {
      cursor: "pointer",
      itemclick: function (e: any) {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
          e.dataSeries.visible = false;
        }
        else {
          e.dataSeries.visible = true;
        }
        e.chart.render();
      }
    },
    data: [
      {
        type: "column",
        name: "Total Male Employees",
        legendText: "Male",
        showInLegend: true,
        color: "#00caba",
        dataPoints: [] as { label: string, y: number }[]
      },
      {
        type: "column",
        name: "Total Female Employees",
        legendText: "Female",
        axisYType: "secondary",
        showInLegend: true,
        color: "#ef6f2a",
        dataPoints: [] as { label: string, y: number }[]
      }
    ]
  };

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
  totalAbsents:number=0;
  totalWorking:number=0;
  totalGatePasses:number=0;

  departmentEmployeeCounts: DepartmentEmployeeCount[] = [];

  constructor(private ax:AxiosService) {}

  async ngOnInit() {

    await this.fetchTotalEmployeeCount();
    await this.fetchTotalCurrentWorkingEmployeeCount();
    await this.fetchTotalTodayAbsentEmployeeCount();
    await this.fetchDepartmentEmployeeCounts();
    await this.fetchEmployeeCountsByGender();
    await this.workingAndAbsentEmployeeDetails();
    await this.fetchTotalCurrentGatePassEmployeeCount();



  }

  employeesWorking: WorkingAndAbsentEmployeeDetails[] = [];
  employeesAbsent: WorkingAndAbsentEmployeeDetails[] = [];
  currentGatePass:CurrentGatePassView[]=[];

  cards = [
    { title: 'Company Total Employees', value: 0 },
    { title: 'Currently working Employees', value: 0 },
    { title: 'Today Absent Employees', value: 0 },
    { title: 'Currently Gate passes', value: 0 }
  ];

  // Define a type for the card titles
  currentCard: { title: string, value: number } | null = null;

  viewDetails(card: { title: string, value: number }) {
    this.currentCard = card;
  }

  closeDetails() {
    this.currentCard = null;
  }

  async fetchTotalEmployeeCount(): Promise<void> {
    try {
      const response = await this.ax.request("GET", "/totalCount", {}, {});
      this.totalEmployees = response.data;
      this.cards[0].value = this.totalEmployees;
    } catch (error) {
      console.error('Error fetching total employee count:', error);
    }
  }

  async fetchTotalCurrentWorkingEmployeeCount(){

    try {
      const response = await this.ax.request("GET", "/totalWorking", {}, {});
      this.totalWorking = response.data;
      this.cards[1].value = this.totalWorking;
    } catch (error) {
      console.error('Error fetching total Working employee count:', error);
    }

  }

  async fetchTotalTodayAbsentEmployeeCount(){

    try {
      const response = await this.ax.request("GET", "/totalAbsent", {}, {});
      this.totalAbsents = response.data;
      this.cards[2].value = this.totalAbsents;
    } catch (error) {
      console.error('Error fetching total absent employee count:', error);
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



    if (this.chartDep) {
      this.chartDep.render();
    }
  }

  async fetchEmployeeCountsByGender(): Promise<void> {
    try {
      const response = await this.ax.request("GET", "/employeeCountsByGender", {}, {});
      const data = response.data;
      console.log(data)
      this.chartOptionsEmp.data[0].dataPoints = data.map((department: any) => ({
        label: department.departmentName,
        y: department.maleCount
      }));
      this.chartOptionsEmp.data[1].dataPoints = data.map((department: any) => ({
        label: department.departmentName,
        y: department.femaleCount
      }));

      if (this.chartEmp) {
        this.chartEmp.render();
      }
    } catch (error) {
      console.error('Error fetching employee counts by gender:', error);
    }
  }

  getChartInstance2(chart: object) {
    this.chartEmp = chart;
  }

  getChartInstance1(chart: object) {
    this.chartDep = chart;
  }

  showDepartmentsChart() {
    this.selectedChart = 'departments';
  }

  showEmployeesChart() {
    this.selectedChart = 'employees';
  }


  //get all absent and present employees
  async workingAndAbsentEmployeeDetails(): Promise<void> {

    try {
      const response = await this.ax.request("GET","/WorkingAndAbsentEmployeeDetails",{},{});
      const allEmployees: WorkingAndAbsentEmployeeDetails[] = response.data;

      this.employeesWorking = allEmployees.filter(emp => emp.attendance_status === 'present' || emp.attendance_status==='late');
      this.employeesAbsent = allEmployees.filter(emp => emp.attendance_status === 'absent');

      console.log('Working Employees:', this.employeesWorking);
      console.log('Absent Employees:', this.employeesAbsent);
    } catch (error) {
      console.error('Error fetching WorkingAndAbsentEmployeeDetails', error);
    }
  }

  async fetchTotalCurrentGatePassEmployeeCount(){

    try {
      const response = await this.ax.request("GET", "/fetchTotalCurrentGatePassEmployeeCount", {}, {});

      const allgatepasses: CurrentGatePassView[] = response.data;

      this.currentGatePass = allgatepasses.filter(emp => emp.status === 'approved');
      this.totalGatePasses = this.currentGatePass.length;
      this.cards[3].value = this.totalGatePasses;
      console.log(this.currentGatePass);

    } catch (error) {
    console.error('Error fetching fetchTotalCurrentGatePassEmployeeCount', error);
   }
  }

}
interface DepartmentEmployeeCount {
  departmentName: string;
  employeeCount: number;
}
export interface WorkingAndAbsentEmployeeDetails {

   emp_id:string;
   name:string;
   department:string;
   section:string;
   jobRole:string;
   attendance_status:string;

}
export interface CurrentGatePassView{

  emp_id:string;
  name:string;
  department:string;
  section:string;
  jobRole:string;
  status:string;
  in_time:string;
  out_time:string;

}
