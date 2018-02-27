import { Injectable } from '@angular/core';

@Injectable()
export class GlobalDataProvider {

  private _username: string;

  constructor() {
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }
}
