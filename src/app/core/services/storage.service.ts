import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    this._storage = await this.storage.create();
  }

  // ---------- GENERIC METHODS ----------

  set(key: string, value: any) {
    return this._storage?.set(key, value);
  }

  get(key: string) {
    return this._storage?.get(key);
  }

  remove(key: string) {
    return this._storage?.remove(key);
  }

  // ---------- AUTH TOKEN METHODS ----------

  setToken(token: string) {
    return this._storage?.set('token', token);
  }

  getToken() {
    return this._storage?.get('token');
  }

  removeToken() {
    return this._storage?.remove('token');
  }
}