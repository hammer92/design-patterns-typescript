import { ICoin } from "../models/Coin/CoinModel";
import { CoinAdapter } from "./coinAdapter";
export interface IObserver {
  credit(coin: ICoin, coinType: string, monto: number): void;
  debit(coin: ICoin, coinType: string, monto: number): void;
}

export class Observer implements IObserver {
  credit(coin: ICoin, coinType: string, monto: number): void {
    const currencyAdapter = new CoinAdapter(coin);
    currencyAdapter.credit(monto, coinType);
  }
  debit(coin: ICoin, coinType: string, monto: number): void {
    const currencyAdapter = new CoinAdapter(coin);
    currencyAdapter.debit(monto, coinType);
  }
}
