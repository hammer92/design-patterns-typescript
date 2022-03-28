export class StatusModelA {
  private static _instance: StatusModelA;
  private constructor() {
    this._request = 0;
    this._status = "StatusModelA";
  }
  public static get Instance(): StatusModelA {
    return this._instance || (this._instance = new this());
  }

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
}
