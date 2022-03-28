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
  notify(): void;
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
  public notify(): void {
    this._log.info("Subject: Notifying observers...");
    for (const observer of this.observers) {
      // observer.update(this);
    }
  }

  public someBusinessLogic(request: Request): void {
    this._log.warn(request);
    const coin: ICoin = COIN[request.credit];

    this._log.warn("Saldo actual: ", coin.balance());
    if (coin.saldo < request.monto) {
      this._log.error("Saldo insuficiente");
      return;
    }
  }
  /* public someBusinessLogic(): void {
    this._log.info("\nSubject: I'm doing something important.");
    this.state = Math.floor(Math.random() * (10 + 1));

    this._log.info(`Subject: My state has just changed to: ${this.state}`);
    this.notify();
  }*/
}
export default new ConcreteSubject();
