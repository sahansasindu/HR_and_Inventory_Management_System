import { Component } from '@angular/core';

@Component({
  selector: 'app-productioncricle',
  templateUrl: './productioncricle.component.html',
  styleUrl: './productioncricle.component.css'
})
export class ProductioncricleComponent {

  // Variables to hold the quantities, you can also fetch these from a service
  emptyBottles: number = 0;
  washingBottles: number = 0;
  finishedGoods: number = 0;
  forAgents: number = 0;

  constructor() {

  }

}
