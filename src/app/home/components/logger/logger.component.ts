import {Component, Input, OnInit} from "@angular/core";
import {UserDataStore} from "../../data-stores/user-data/UserDataStore";
import {FuelLog} from "../../models/FuelLog";
import {FuelStop} from "../../models/FuelStop";
import {FileStore} from "../../services/fileIO.service";
import {LogService} from "../../services/log.service";

@Component({
    selector: "app-logger",
    templateUrl: "./logger.component.html",
    styleUrls: ["./logger.component.scss"],
})
export class LoggerComponent implements OnInit {

    @Input() FuelLog: FuelLog;
    public newFuelStop: FuelStop;
    public fuelEconomy: number;

    constructor(private store: FileStore<UserDataStore>,
                private logger: LogService) {}

    ngOnInit() {
        this.logger.log("LOgger init");
        // this.newStop();
        // this.renderEconomy();
        this.logger.log("Logger: ", this.FuelLog);
    }

    alert() {

    }

    renderEconomy() {
        if (this.FuelLog.fuelStops.length > 1) {
            this.fuelEconomy = this.calculatedEconomy(this.FuelLog.fuelStops);
            console.log("Economy calculated as " + this.fuelEconomy);
        } else {
            this.fuelEconomy = null;
        }
    }

    /**
     * @param fuelStops Ordered list with most recent fuel stop at index 0
     */
    calculatedEconomy(fuelStops: FuelStop[]) {

        fuelStops.forEach((stop) => console.log(stop.fuel + " milieage: " + stop.mileage));

        const totalDistance = fuelStops[0].mileage - fuelStops[fuelStops.length - 1].mileage;
        const totalFuel = fuelStops
                .reduce((sum, curr) => sum + Number(curr.fuel), 0)
            - Number(fuelStops[fuelStops.length - 1].fuel); // take away first entry of fuel
        const gallons = totalFuel * 0.22; // litres -> gallons
        return totalDistance / gallons;

    }

    addStop() {
        this.FuelLog.AddFuelStop(this.newFuelStop);
        this.store.set("FuelLog", this.FuelLog);
        this.newStop();
    }

    newStop() {
        if (this.FuelLog.GetLastFuelStop() == null) {
            this.newFuelStop = new FuelStop();
        } else {
            this.newFuelStop = new FuelStop(this.FuelLog.GetLastFuelStop());
        }
        this.renderEconomy();
    }

    removeStop(fuelStop: FuelStop) {
        this.FuelLog.RemoveFuelStop(fuelStop);
        this.store.set("FuelLog", this.FuelLog);
        this.renderEconomy();
    }
}
