import {Inject, Injectable, OnInit} from "@angular/core";
import {File} from "@ionic-native/file/ngx";
import {Platform} from "@ionic/angular";
import {IDataStoreOptions} from "../data-stores/IDataStoreOptions";
import {IStore} from "../data-stores/IStore";
import {IVersionedData} from "../data-stores/IVersionedData";

@Injectable({providedIn: "root"})
export class FileStore<TData extends IVersionedData> implements IStore {

    public Options: IDataStoreOptions<TData>;
    public data: TData;
    private dataDirFolder = "ecotrack";
    public dataDir: { exists: boolean; nativeUrl: string };

    constructor(private file: File,
                private platform: Platform ) {}

    get(key: string) {
        return this.data[key];
    }

    async set(key: string, val: any) {
        this.data[key] = val;
        await this.writeFileText(this.dataDirFolder, this.Options.path, JSON.stringify(this.data));
    }

    public loadOptions(opts: IDataStoreOptions<TData> ) {
        this.Options = opts;
        this.Options.path = this.Options.type + ".json";
    }

    public loadDataFile() {
        this.platform.ready().then(async () => {
            if (this.platform.is("cordova")) {

                try {
                    this.dataDir = await this.directoryExists(this.file.dataDirectory + this.dataDirFolder);
                    if (!this.dataDir.exists) {
                        await this.createFolder(this.file.dataDirectory, this.dataDirFolder);
                    }
                    if (!await this.fileExists(this.dataDir.nativeUrl, this.Options.path)) {
                        await this.createFile(this.dataDir.nativeUrl, this.Options.path);
                    }
                    let data = JSON.parse(await this.readFileText(this.file.dataDirectory, this.Options.path)) as TData;
                    if (data.Version < this.Options.defaults.Version) {
                        console.log("Old version [" + data.Version + "] of [" + this.Options.type + "]. " +
                            "New version is [" + this.data.Version + []);
                        // todo - map across old data https://github.com/loedeman/AutoMapper
                        data = this.Options.defaults;
                    }
                    this.data = data;
                } catch (error) {
                    this.data = this.Options.defaults;
                }
            } else {
                // fallback to browser APIs
                throw new Error("Not cordova");
            }
        });

    }

    public async createFolder(root: string, folder: string, replace: boolean = false) {
        await this.file.createDir(root, folder, replace).then(() => {
            console.log(folder + " created");
        }).catch(() => {
            throw new Error("Failed to create folder: " + root + folder);
        });
    }

    public async createFile(path: string, filename: string) {
        this.file.createFile(path, filename, false).then(value => {
            console.log("file created", value);
        }).catch(reason => {
            console.log("Failed to create file: ", reason);
        });
    }

    public async directoryExists(path: string): Promise<{ exists: boolean, nativeUrl: string }> {
        return this.file.resolveDirectoryUrl(path).then(value => {
            console.log(path + " exists", value);
            return {exists: true, nativeUrl: value.nativeURL};
        }).catch(() => {
            console.log(path + " doesn't exist");
            return {exists: false, nativeUrl: ""};
        });
    }

    public async fileExists(path: string, filename: string): Promise<boolean> {
        return this.file.checkFile(path, filename).then(value => {
            console.log(filename + " exists");
            return true;
        }).catch(reason => {
            console.log(filename + " doesn't exist");
            return false;
        });
    }

    public async deleteFile(path: string, file: string) {
        this.file.removeFile(path, file).then(value => {
            console.log(file + " deleted");
        }).catch(reason => {
            console.log("Delete file failed for " + path + file);
            // throw new Error("Delete file failed for " + path + file);
        });
    }

    public async readFileText(path: string, file: string): Promise<string> {
        return this.file.readAsText(path, file).then(value => {
            return value;
        }).catch(reason => {
            throw new Error("File read failed for " + path + file);
        });
    }

    async writeFileText(path: string, file: string, text: string) {
        this.file.writeExistingFile(path, file, text).then(() => {
            console.log("File written successfully: " + path + file);
        }).catch(() => {
            throw new Error("File write failed for " + path + file);
        });
    }
}
