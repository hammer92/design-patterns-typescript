import { ICoin } from "../models/Coin/CoinModel";
import { ProxyLogger } from "./loggerProxy";

export interface ICoinAdapter {
  balance(): string;
  credit(monto: number, tasa: string): void;
  debit(monto: number, tasa: string): void;
}

export class CoinAdapter implements ICoinAdapter {
  private _coin: ICoin;
  private _log: ProxyLogger;

  constructor(coin: ICoin) {
    this._coin = coin;
    this._log = new ProxyLogger({ name: CoinAdapter.name });
  }

  public balance(): string {
    return this._coin.balance();
  }

  public debit(monto: number, tasa: string): void {
    this._log.info("Saldo actual: ", this._coin.balance());
    const tasaCoin = this._coin.tasa[tasa];
    const abono = monto / tasaCoin;
    this._log.info("abono debit:", abono);
    this._coin.debit(abono);

    this._log.info("Saldo después abono: ", this._coin.balance());
  }

  public credit(monto: number, tasa: string): void {
    this._log.info("Saldo actual: ", this._coin.balance());
    const tasaCoin = this._coin.tasa[tasa];
    const abono = monto / tasaCoin;
    this._log.info("abono credit: ", abono);
    this._coin.credit(abono);
    this._log.info("Saldo después abono: ", this._coin.balance());
  }
}
