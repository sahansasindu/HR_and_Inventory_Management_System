import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {ProductionIssue} from "../../../model/issuemodel";
import {AxiosService} from "../../../axios.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-manageissue',
  templateUrl: './manageissue.component.html',
  styleUrl: './manageissue.component.css'
})

export class ManageissueComponent implements data,OnInit{

  chart: any;
  isManageProductionIssues: boolean=false;

  constructor(private axiosService:AxiosService ) {
  }

  async ngOnInit() {

    await this.getIssueDetails();

    const currentYear = new Date().getFullYear();
    for (let year = currentYear - 10; year <= currentYear + 10; year++) {
      this.years.push(year);
    }
  }

  displayedColumns: string[] = ['issue_id', 'issue_name', 'actions'];
  dataSourceIssue = new MatTableDataSource<ProductionIssue>([

  ]);

  ELEMENT_DATA_AGENT: ProductionIssue[] = [

  ];


  manageIssue() {

    this.isManageProductionIssues=!this.isManageProductionIssues;

  }

  async addNewIssue(): Promise<void> {

    const inputField = document.getElementById('addNewIssue') as HTMLInputElement;
    const issue_name = inputField.value;

    if (!issue_name) {
      inputField.focus();
      return;
    }

    try {
      await this.axiosService.request("POST", `/addNewIssue/${issue_name}`, {}, {})
        .then(response => {
          if (response.data && response.data.message) {
            alert(response.data.message);
          } else {
            Swal.fire({
              icon: 'success',
              title: 'Submission successful',
              text: 'Issue Details Submission successful',
            });
            inputField.value='';
            this.getIssueDetails();
          }
        })
        .catch(error => {
          if (error.response && error.response.data && error.response.data.message) {
            alert(error.response.data.message);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Submission Unsuccessful',
              text: 'Issue Details Submission Unsuccessful',
            });
          }
        });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Submission Unsuccessful',
        text: 'Issue Details Submission Unsuccessful',
      });
    }
  }

  async getIssueDetails():Promise<void>{

    try {
      const response = await this.axiosService.request('GET', '/getIssueDetails', {}, {});
      this.dataSourceIssue.data = response.data;
      this.ELEMENT_DATA_AGENT = this.dataSourceIssue.data;
      console.log('Issue Details fetched successfully:', response.data);
    } catch (error) {
      console.error('Error fetching Issue Details:', error);
    }

  }

  async toggleEditMode(element: any) {
    if (element.editing) {
      await this.updateIssue(element);
    } else {
      element.editing = !element.editing;
    }
  }


  async updateIssue(element: any) {
    try {
      const updatedIssueData = {
        issue_id: element.issue_id,
        issue_name: element.issue_name
      };

      console.log(updatedIssueData)
      await this.axiosService.request("PUT", "/updateIssue", updatedIssueData, {})
        .then(response => {
          if (response.data && response.data.message) {
            alert(response.data.message);
          } else {
            Swal.fire({
              icon: 'success',
              title: 'Updated successfully',
              text: 'Issue updated successfully',
            });
            this.getIssueDetails();
          }
        })
        .catch(error => {
          if (error.response && error.response.data && error.response.data.message) {
            alert(error.response.data.message);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Updated Unsuccessfully',
              text: 'Issue updated Unsuccessful..',
            });
          }
        });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Updated Unsuccessfully',
        text: 'Issue updated Unsuccessful..',
      });
    } finally {
      element.editing = false;
    }
  }

  newVSReturningVisitorsOptions = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2",
    title: {
      text: "Monthly Milk Production Issues"
    }
  };

  options: data = {
    "Monthly Milk Production Issues": [{
      type: "pie",
      name: "Monthly Milk Production Issues",
      startAngle: 90,
      cursor: "pointer",
      explodeOnClick: false,
      showInLegend: true,
      legendMarkerType: "square",
      indexLabelPlacement: "inside",
      indexLabelFontColor: "white",
      dataPoints: []
    }]
  };


  getChartInstance(chart: object) {
    this.chart = chart;
    this.chart.options = this.newVSReturningVisitorsOptions;
    this.chart.options.data = this.options["Monthly Milk Production Issues"];
    this.chart.render();
  }

  months = [
    { value: 1, name: 'January' },
    { value: 2, name: 'February' },
    { value: 3, name: 'March' },
    { value: 4, name: 'April' },
    { value: 5, name: 'May' },
    { value: 6, name: 'June' },
    { value: 7, name: 'July' },
    { value: 8, name: 'August' },
    { value: 9, name: 'September' },
    { value: 10, name: 'October' },
    { value: 11, name: 'November' },
    { value: 12, name: 'December' }
  ];

  years: number[] = [];
  selectedMonth: number | null = null;
  selectedYear: number | null = null;

  //get monthly issues oder by seperate issues
  async getMonthlyIssue() {

    if (!this.selectedMonth || !this.selectedYear) {
      Swal.fire({
        icon: 'warning',
        title: 'Select Month and Year',
        text: 'Please select both month and year',
      });
    } else {

      console.log(`Selected Month: ${this.selectedMonth}, Selected Year: ${this.selectedYear}`);
      const url = `/getMonthlyIssues?month=${this.selectedMonth}&year=${this.selectedYear}`;

      try {
        const response = await this.axiosService.request('GET', url, {}, {});
        console.log('Response data:', response);

        const dataPoints = response.data.map((issue: any) => ({
          y: issue.total_damage_amount,
          name: issue.issue_name
        }));

        this.updateChart(dataPoints);

      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error fetching purchase details',
        });
      }
    }
  }

  updateChart(dataPoints: any) {
    this.chart.options.data[0].dataPoints = dataPoints;
    this.chart.render();
  }
}

export interface data {
  [key: string]: any;
}
