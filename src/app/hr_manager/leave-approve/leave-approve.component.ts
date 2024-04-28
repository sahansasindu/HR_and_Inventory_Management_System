import { Component } from '@angular/core';

@Component({
  selector: 'app-leave-approve',
  templateUrl: './leave-approve.component.html',
  styleUrl: './leave-approve.component.css'
})
export class LeaveApproveComponent {
  displayedColumns: string[] = ['name', 'id']; // Define columns to display
  dataSource = [
    { name: 'John', id: 1 },
    { name: 'Alice', id: 2},
    // Add more data as needed
  ];
  searchTerm: string = ''; // Variable to store the search term entered by the user

  onSearch(): void {
    // Perform search operations based on the value of searchTerm
    console.log('Search term:', this.searchTerm);
  }


  async onViewPdf() {


  }
}
