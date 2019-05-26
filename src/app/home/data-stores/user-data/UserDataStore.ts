import {FuelLog} from "../../models/FuelLog";
import {IDataStore} from "../IDataStore";
import {UserDataStoreOpts} from "./UserDataStoreOpts";

export class UserDataStore implements IDataStore<UserDataStore> {
  public Version = 0.3;
  public fuelLog: FuelLog;
  public Options: UserDataStoreOpts;

  constructor() {
    this.fuelLog = new FuelLog();
    this.Options = new UserDataStoreOpts();
  }
}
