import {Injectable} from "@angular/core";
import {IDataStoreOptions} from "../IDataStoreOptions";
import {UserDataStore} from "./UserDataStore";

@Injectable({providedIn: "root"})
export class UserDataStoreOpts implements IDataStoreOptions<UserDataStore> {
  type = "UserDataStore";
  path: string;
  defaults: UserDataStore;

  constructor() {
    this.defaults = new UserDataStore();
  }
}
