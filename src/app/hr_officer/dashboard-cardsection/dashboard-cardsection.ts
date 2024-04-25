import { ChangeDetectorRef, Component } from '@angular/core';
import { AxiosService } from "../../axios.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-dashboard-cardsection',
  templateUrl: './dashboard-cardsection.html',
  styleUrls: ['./dashboard-cardsection.css']
})
export class DashboardCardsection {

  totalEmployeeCount: number = 0; // Initialize totalEmployeeCount variable

  constructor(private axiosService: AxiosService, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.fetchEmployeeData();
  }

  fetchEmployeeData() {
    this.axiosService.request('GET', 'totalCount', null,{})
      .then(response => {
        console.log('Fetched data:', response.data);
        this.totalEmployeeCount = response.data; // Set totalEmployeeCount to response.data
        this.cdr.detectChanges(); // Detect changes to update the view
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

}
