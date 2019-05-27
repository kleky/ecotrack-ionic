import {Component, OnInit} from "@angular/core";
import {UserDataStore} from "./data-stores/user-data/UserDataStore";
import {UserDataStoreOpts} from "./data-stores/user-data/UserDataStoreOpts";
import {FileStore} from "./services/fileIO.service";
import {LogService} from "./services/log.service";

@Component({
    selector: "app-home",
    templateUrl: "home.page.html",
    styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {

    constructor(private file: FileStore<UserDataStore>,
                private logger: LogService) {}

    ngOnInit(): void {
        this.file.loadOptions(new UserDataStoreOpts()).then(e => {
            this.file.loadDataFile();
        }).catch(err => {
            this.logger.log("Load options file error");
        });
    }

    async reset() {
        await this.file.deleteFile(this.file.dataDir.nativeUrl, this.file.Options.path);
    }

    async output() {
        this.logger.log("file: " + await this.file.readFileText(this.file.dataDir.nativeUrl, this.file.Options.path));
        this.logger.log("data: ", this.file.data);
    }


}
