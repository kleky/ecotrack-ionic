import {Component, Input, OnInit} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {UserDataStore} from "../../data-stores/user-data/UserDataStore";
import {FuelLog} from "../../models/FuelLog";
import {FuelStop} from "../../models/FuelStop";
import {FileStore} from "../../services/file-store.service";
import {LogService} from "../../services/log.service";

@Component({
    selector: "app-logger",
    templateUrl: "./logger.component.html",
    styleUrls: ["./logger.component.scss"],
})
export class LoggerComponent implements OnInit {

    @Input() FuelLog: BehaviorSubject<FuelLog>;
    public newFuelStop: FuelStop;
    public fuelEconomy: number;

    constructor(private store: FileStore<UserDataStore>,
                private logger: LogService) {}

    ngOnInit() {
        this.newStop();
        this.renderEconomy();
    }
    alert() {

    }

    renderEconomy() {
        if (this.FuelLog.getValue().fuelStops.length > 1) {
            this.fuelEconomy = this.calculatedEconomy(this.FuelLog.getValue().fuelStops);
            this.logger.log("[LOGGER] Economy calculated as " + this.fuelEconomy);
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
        const entry = this.FuelLog.getValue();
        entry.AddFuelStop(this.newFuelStop);
        this.FuelLog.next(entry);
        // this.store.set("FuelLog", this.FuelLog);
        this.newStop();
    }

    newStop() {
        if (this.FuelLog.getValue().GetLastFuelStop() == null) {
            this.newFuelStop = new FuelStop();
        } else {
            this.newFuelStop = new FuelStop(this.FuelLog.getValue().GetLastFuelStop());
        }
        this.renderEconomy();
    }

    removeStop(fuelStop: FuelStop) {
        const entry = this.FuelLog.getValue();
        entry.RemoveFuelStop(fuelStop);
        this.FuelLog.next(entry);
        // this.store.set("FuelLog", this.FuelLog);
        this.renderEconomy();
    }
}
