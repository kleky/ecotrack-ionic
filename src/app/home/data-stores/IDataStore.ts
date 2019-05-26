import {IDataStoreOptions} from "./IDataStoreOptions";

export interface IDataStore<T> {
  Version: number;
  Options: IDataStoreOptions<T>;
}
