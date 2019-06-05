export class FuelStop {
  constructor(fuelStop: FuelStop = null) {
    this.mileage = fuelStop ? fuelStop.mileage : null;
    this.fuel = fuelStop ? fuelStop.fuel : null;
  }
  mileage: number;
  fuel: number;
}
