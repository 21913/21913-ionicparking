import { Component } from '@angular/core';
import { ParkedCar } from '../models/parked-car';
 
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
 
  runningTotal = 0;
  minimumCharge = 2;
 
  listOfCharges: ParkedCar[] = [];
 
  selectedRegistration: string;
  selectedHours: number;
 
  constructor() {}
 
  calculateCharge(): void {
    if (isNaN(this.selectedHours) || this.selectedHours <= 0) {
      return;
    }
 
    if (this.selectedRegistration.length === 0) {
      return;
    }
 
    if (this.listOfCharges.filter(charge => charge.registration === this.selectedRegistration).length > 0) {
      return;
    }
 
    const currentCharge = this.calculateParkingCharge(this.selectedHours);
    this.runningTotal += currentCharge;
    const newCar = {
      registration: this.selectedRegistration,
      hoursParked: this.selectedHours,
      parkingCharge: currentCharge,
      runningTotal: this.runningTotal
    };
 
    this.listOfCharges.push(newCar);
  }
 
  calculateParkingCharge(hours: number): number {
    const partialCharge = .5;
    if (hours <= 3) {
      return this.minimumCharge;
    }
 
    const totalCharge = ((hours-3)*partialCharge) + this.minimumCharge;
 
    return totalCharge <= 10 ? totalCharge : 10;
  }
 
  resetButton(): void {
    this.runningTotal = 0;
    this.listOfCharges = [];
    this.selectedRegistration = '';
  }
}
 