import {Component, OnInit} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {UserDataStore} from "./data-stores/user-data/UserDataStore";
import {UserDataStoreOpts} from "./data-stores/user-data/UserDataStoreOpts";
import {FuelLog} from "./models/FuelLog";
import {FileStore} from "./services/fileIO.service";
import {LogService} from "./services/log.service";

@Component({
    selector: "app-home",
    templateUrl: "home.page.html",
    styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {

    public FuelLog: BehaviorSubject<FuelLog>;

    constructor(private store: FileStore<UserDataStore>,
                private logger: LogService) {}

    ngOnInit(): void {
        this.store.loadOptions(new UserDataStoreOpts()).then(e => {
            this.store.loadDataFile().subscribe(value => {
                this.FuelLog.next(new FuelLog(value.fuelLog));
                this.logger.log("Loaded file");
                this.logger.log("FuelLog: ", this.FuelLog);
            });
        }).catch(err => {
            this.logger.log("Load options store error");
        });
    }

    async reset() {
        await this.store.deleteFile(this.store.dataDir.nativeUrl, this.store.Options.path);
    }

    async output() {
        this.logger.log("store: " + await this.store.readFileText(this.store.dataDir.nativeUrl, this.store.Options.path));
        this.logger.log("data: ", this.store.data);
    }


}
