export interface IDataStoreOptions<T> {
  type: string;
  path: string;
  defaults: T;
}
