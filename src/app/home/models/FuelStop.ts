export class FuelStop {
  constructor(fuelStop: FuelStop = null) {
    this.mileage = fuelStop ? fuelStop.mileage : null;
    this.fuel = fuelStop ? fuelStop.fuel : null;
    this.dateAddedUtc = fuelStop ? fuelStop.dateAddedUtc : new Date().getTime();
  }
  mileage: number;
  fuel: number;
  dateAddedUtc: number;
}
