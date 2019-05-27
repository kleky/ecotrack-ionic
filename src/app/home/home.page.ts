import {Component, OnInit} from "@angular/core";
import {UserDataStore} from "./data-stores/user-data/UserDataStore";
import {UserDataStoreOpts} from "./data-stores/user-data/UserDataStoreOpts";
import {FileStore} from "./services/fileIO.service";

@Component({
    selector: "app-home",
    templateUrl: "home.page.html",
    styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit{

    public message: string[] = [];

    constructor(private file: FileStore<UserDataStore>) {}

    ngOnInit(): void {
        this.file.loadOptions(new UserDataStoreOpts());
        this.file.loadDataFile();
        this.log("file: " , this.file.Options);
    }

    async reset() {
        await this.file.deleteFile(this.file.dataDir.nativeUrl, this.file.Options.path);
    }

    async output() {
        this.log("file: " + await this.file.readFileText(this.file.dataDir.nativeUrl, this.file.Options.path));
        this.log("data: ", this.file.data);
    }

    log(msg: string, obj: any = null) {
        if (obj) {
            this.message.unshift(msg + ": " + JSON.stringify(obj));
        } else {
            this.message.unshift(msg);
        }
    }
}
