import { Observer } from "./observer";
import { ProxyLogger } from "./loggerProxy";
import { Request } from "../models/requestModel";
import { ICoin } from "../models/Coin/CoinModel";

import CoinUSDModel from "../models/Coin/USDModel";
import CoinEURModel from "../models/Coin/EURModel";
import CoinCopModel from "../models/Coin/COPModel";
const COIN = {
  COP: CoinCopModel,
  USD: CoinUSDModel,
  EUR: CoinEURModel,
};

export interface Subject {
  attach(observer: Observer): void;
  detach(observer: Observer): void;
  notify(event: string, coin: ICoin, coinType: string, monto: number): void;
}

class ConcreteSubject implements Subject {
  public state: number = 0;

  private observers: Observer[] = [];

  private _log: ProxyLogger;
  constructor() {
    this._log = new ProxyLogger({ name: ConcreteSubject.name });
  }

  /**
   * Los métodos de gestión de suscripciones.
   */
  public attach(observer: Observer): void {
    const isExist = this.observers.includes(observer);
    if (isExist) {
      this._log.info("Subject: Observer has been attached already.");
      return;
    }

    this.state++;
    this._log.info(
      `Subject: Attached an observer. ${observer.constructor.name}`
    );
    this.observers.push(observer);
  }

  public detach(observer: Observer): void {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex === -1) {
      this._log.info("Subject: Nonexistent observer.");
      return;
    }

    this.observers.splice(observerIndex, 1);
    this._log.info("Subject: Detached an observer.");
  }

  /**
   * Activar una actualización en cada suscriptor.
   */
  public notify(
    event: string,
    coin: ICoin,
    coinType: string,
    monto: number
  ): void {
    this._log.info(
      "Subject: Notifying observers...",
      event,
      coin.constructor.name,
      coinType,
      monto
    );
    for (const observer of this.observers) {
      observer[event](coin, coinType, monto);
    }
  }

  public someBusinessLogic(request: Request): void {
    this._log.warn(request);
    const coinCredit: ICoin = COIN[request.credit];
    const coinDebit: ICoin = COIN[request.debit];
    this.notify("credit", coinCredit, request.credit, request.monto);
    this.notify("debit", coinDebit, request.credit, request.monto);
  }
}
export default new ConcreteSubject();
