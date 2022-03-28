import { ICoinAdapter } from "./coinAdapter";

export interface Observer {
  update(coin: ICoinAdapter): void;
}

export class CoinCOPObserver implements Observer {
  public update(coin: ICoinAdapter): void {}
}
export class CoinUSDObserver implements Observer {
  public update(coin: ICoinAdapter): void {}
}
export class CoinEURObserver implements Observer {
  public update(coin: ICoinAdapter): void {}
}
