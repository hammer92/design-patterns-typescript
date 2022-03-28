export class StatusModelB {
  private _request: number;
  public get request(): number {
    return this._request;
  }
  public set request(value: number) {
    this._request = value;
  }
  private _status: string;
  public get status(): string {
    return this._status;
  }
  public set status(value: string) {
    this._status = value;
  }

  constructor() {
    this._status = "StatusModelB";
    this._request = 0;
  }
}

export default new StatusModelB();
