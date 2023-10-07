export class User {

  constructor(public email: string, public userId: string, public _token: string, private _ExpireDate: Date) { }

  get token() {
    if (!this._token || new Date > this._ExpireDate) {
      return null
    }
    return this._token
  }
}
