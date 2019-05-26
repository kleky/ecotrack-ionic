export class FuelStop {
  constructor(fuelStop: FuelStop = null) {
    this.mileage = fuelStop ? fuelStop.mileage : 0;
    this.fuel = fuelStop ? fuelStop.fuel : 0;
  }
  mileage: number;
  fuel: number;
}
