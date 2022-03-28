import { ICoin } from "../models/Coin/CoinModel";

interface ICoinAdapter {
  balance(): string;
  add(monto: number, tasa: string): void;
}

export class CoinAdapter implements ICoinAdapter {
  private _coin: ICoin;

  constructor(coin: ICoin) {
    this._coin = coin;
  }

  public balance(): string {
    return this._coin.balance();
  }

  public add(monto: number, tasa: string): void {
    const tasaCoin = this._coin.tasa[tasa];
    const abono = monto / tasaCoin;
    this._coin.add(abono);
  }
}
