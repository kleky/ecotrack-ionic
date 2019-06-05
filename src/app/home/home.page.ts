import {Component, OnInit} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {UserDataStore} from "./data-stores/user-data/UserDataStore";
import {UserDataStoreOpts} from "./data-stores/user-data/UserDataStoreOpts";
import {FuelLog} from "./models/FuelLog";
import {FileStore} from "./services/file-store.service";
import {LogService} from "./services/log.service";

@Component({
    selector: "app-home",
    templateUrl: "home.page.html",
    styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {

    public FuelLog: BehaviorSubject<FuelLog> = new BehaviorSubject(new FuelLog());

    constructor(private store: FileStore<UserDataStore>,
                private logger: LogService) {
    }

    ngOnInit(): void {
        this.store.loadOptions(new UserDataStoreOpts()).then(e => {
            this.store.loadDataFile().subscribe(userData => {
                this.logger.log("[HOME PAGE] Load data file : ", userData);
                this.FuelLog.next(new FuelLog(userData.fuelLog));
                this.FuelLog.asObservable().subscribe(log => {
                    this.logger.log("[HOME PAGE] Fuel Log change");
                    this.store.set("fuelLog", log).then(() => {
                        this.logger.log("[HOME PAGE] Fuel log saved");
                    }).catch(() => {
                        this.logger.log("[HOME PAGE] Error saving fuel log");
                    });
                });
            });
        }).catch(() => {
            this.logger.log("[HOME PAGE] Load options store error");
        });
    }

    async reset() {
        await this.store.deleteStorage(this.store.Options.type);
    }

    async output() {
        // this.logger.log("[HOME PAGE] store: " + await this.store.readFileText(this.store.dataDir.nativeUrl, this.store.Options.path));
        this.logger.log("[HOME PAGE] data: ", this.FuelLog.getValue());
    }


}
