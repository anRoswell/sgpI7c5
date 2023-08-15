export interface IStorage {
  init(): Promise<void>;
  destroy(key: string): void;
  clear(): void;
  setData(key: string, value: any): void;
  getData(key: string): Promise<any> | undefined;
}
