import { Component } from '@angular/core';

@Component({
  selector: 'app-medical-approve',
  templateUrl: './medical-approve.component.html',
  styleUrl: './medical-approve.component.css'
})
export class MedicalApproveComponent {
  displayedColumns: string[] = ['name', 'id','submittedDate']; // Define columns to display
  dataSource = [
    { name: 'John', id: 1,submittedDate: '10.03.2023' },
    { name: 'Alice', id: 2,submittedDate: '23.05.2023' },
    // Add more data as needed
  ];
  searchTerm: string = ''; // Variable to store the search term entered by the user

  viewMedicals() {
    console.log('View Medical button clicked');
    try {
      const pdfUrl = 'file:///D:/240409160119-ICT%20L%202%20S%20II%20.pdf';
      window.open(pdfUrl, '_blank');
      console.log('PDF opened successfully');
    } catch (error) {
      console.error('Error opening PDF:', error);
    }
  }



  onSearch(): void {
    // Perform search operations based on the value of searchTerm
    console.log('Search term:', this.searchTerm);
  }


}
