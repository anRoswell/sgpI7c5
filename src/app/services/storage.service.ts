import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';
import { IStorage } from '../interfaces/IStorage';

@Injectable({
  providedIn: 'root',
})
export class StorageService implements IStorage {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public setData(key: string, value: any) {
    this._storage?.set(key, value);
  }

  public getData(key: string): Promise<any> | undefined {
    return this._storage?.get(key);
  }

  public destroy(key: string) {
    this._storage?.remove(key);
  }

  public clear() {
    this._storage?.clear();
  }

  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  public get(key: string) {
    return this._storage?.get(key);
  }
}
