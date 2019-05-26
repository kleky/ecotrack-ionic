import {strategy} from "@angular-devkit/core/src/experimental/jobs";
import {isDefined} from "@angular/compiler/src/util";
import {Component} from "@angular/core";
import {File} from "@ionic-native/file/ngx";
import {Platform} from "@ionic/angular";
import {__await} from "tslib";
import {UserDataStore} from "./data-stores/user-data/UserDataStore";
import {FileStore} from "./services/fileIO.service";
import {UserDataStoreOpts} from "./data-stores/user-data/UserDataStoreOpts";

@Component({
    selector: "app-home",
    templateUrl: "home.page.html",
    styleUrls: ["home.page.scss"],
})
export class HomePage {

    public message: string[] = [];



    constructor(private file: FileStore<UserDataStore>) {
        this.log("file: " , file.data);
    }

    async reset() {
        await this.file.deleteFile(this.file.dataDir.nativeUrl, this.file.data.Options.path);
    }

    async output() {
        this.log("" + this.file.dataDir.exists);
    }

    log(msg: string, obj: any = null) {
        if (obj) {
            this.message.unshift(msg + ": " + JSON.stringify(obj));
        } else {
            this.message.unshift(msg);
        }
    }
}
