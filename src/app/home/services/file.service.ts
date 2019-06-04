import {Injectable} from "@angular/core";
import {File} from "@ionic-native/file/ngx";
import {Platform} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {BehaviorSubject, Observable} from "rxjs";
import {IDataStoreOptions} from "../data-stores/IDataStoreOptions";
import {IStore} from "../data-stores/IStore";
import {IVersionedData} from "../data-stores/IVersionedData";
import {LogService} from "./log.service";

@Injectable({providedIn: "root"})
export class FileService {

    public data: any;
    private dataDirFolder = "ecotrack";
    public dataDir: { exists: boolean; nativeUrl: string };

    constructor(private file: File,
                private platform: Platform,
                private logger: LogService) {
    }

    get(key: string) {
        return this.data[key];
    }

    // async set(key: string, val: any) {
    //     this.logger.log("data", this.data);
    //     this.data[key] = val;
    //     return this.writeFileText(this.dataDirFolder, this.Options.path, encodeURIComponent(JSON.stringify(this.data)));
    // }
    //
    // public async loadOptions(opts: IDataStoreOptions<TData>): Promise<boolean> {
    //     this.Options = opts;
    //     this.Options.path = this.Options.type + ".json";
    //     this.logger.log("[FILE IO] 1. Options loaded for " + this.Options.path);
    //     return true;
    // }

    // public loadDataFile(): Observable<any> {
    //
    //     return new Observable(observer => {
    //         this.logger.log("[FILE IO] 2. Load data.");
    //         this.platform.ready().then(async () => {
    //             if (this.platform.is("cordova")) {
    //                 this.logger.log("[FILE IO] 3. Cordova platform");
    //                 try {
    //                     this.dataDir = await this.directoryExists(this.file.dataDirectory + this.dataDirFolder);
    //                     this.logger.log("[FILE IO] 4. Data dir: ", this.dataDir);
    //                     if (!this.dataDir.exists) {
    //                         await this.createFolder(this.file.dataDirectory, this.dataDirFolder);
    //                     }
    //                     if (!await this.fileExists(this.dataDir.nativeUrl, this.Options.path)) {
    //                         await this.createFile(this.dataDir.nativeUrl, this.Options.path);
    //                     }
    //                     const fileContent: string = await this.readFileText(this.dataDir.nativeUrl, this.Options.path);
    //                     let data = fileContent
    //                         ? JSON.parse(fileContent) as TData
    //                         : this.Options.defaults;
    //
    //                     if (data.Version < this.Options.defaults.Version) {
    //                         this.logger.log("[FILE IO] Old version [" + data.Version + "] of [" + this.Options.type + "]. " +
    //                             "New version is [" + data.Version + []);
    //                         // todo - map across old data as this will wipe everything - https://github.com/loedeman/AutoMapper
    //                         data = this.Options.defaults;
    //                     }
    //                     this.logger.log("[FILE IO] File load complete. Data in memory: ", data);
    //                     this.data = data;
    //                     observer.next(data);
    //                 } catch (error) {
    //                     this.logger.log("[FILE IO] Error encountered trying to load file: ", error);
    //                     observer.error("Error encountered trying to load file");
    //                 }
    //             } else {
    //                 // fallback to browser APIs
    //                 this.logger.log("[FILE IO] Not Cordova platform");
    //                 observer.error("Not cordova platform");
    //             }
    //         });
    //     });
    // }

    public async createFolder(root: string, folder: string, replace: boolean = false) {
        await this.file.createDir(root, folder, replace).then(() => {
            this.logger.log(folder + " created");
        }).catch(() => {
            throw new Error("Failed to create folder: " + root + folder);
        });
    }

    public async createFile(path: string, filename: string) {
        this.file.createFile(path, filename, false).then(value => {
            this.logger.log("[FILE IO] file created");
        }).catch(reason => {
            this.logger.log("[FILE IO] Failed to create file: ", reason);
        });
    }

    public async directoryExists(path: string): Promise<{ exists: boolean, nativeUrl: string }> {
        return this.file.resolveDirectoryUrl(path).then(value => {
            this.logger.log("[FILE IO] Folder '" + path + "' exists: " + (value !== null));
            return {exists: true, nativeUrl: value.nativeURL};
        }).catch(() => {
            this.logger.log(path + " doesn't exist");
            return {exists: false, nativeUrl: ""};
        });
    }

    public async fileExists(path: string, filename: string): Promise<boolean> {
        return this.file.checkFile(path, filename).then(value => {
            this.logger.log("[FILE IO] File '" + filename + "' exists: " + value);
            return true;
        }).catch(reason => {
            this.logger.log(filename + " doesn't exist");
            return false;
        });
    }

    public async deleteFile(path: string, file: string) {
        this.file.removeFile(path, file).then(() => {
            this.logger.log(file + " deleted");
        }).catch(reason => {
            this.logger.log("[FILE IO] Delete file failed for " + path + file);
            // throw new Error("Delete file failed for " + path + file);
        });
    }

    public async readFileText(path: string, file: string): Promise<string> {
        return this.file.readAsText(path, file).then(value => {
            this.logger.log(`File success: '${path}${file}'. Contents: ${value}`);
            return value;
        }).catch(reason => {
            this.logger.log("[FILE IO] File read failed for " + path + file);
            throw new Error("File read failed for " + path + file);
        });
    }

    async writeFileText(path: string, file: string, text: string): Promise<void> {
        this.logger.log("[FILE IO] Writing file: " + text);
        return this.file.writeExistingFile(path, file, text).then(() => {
            this.logger.log("[FILE IO] File written successfully: " + path + file);
        }).catch((err) => {
            this.logger.log("[FILE IO] File write failed for " + path + file, err);
        });
    }
}
