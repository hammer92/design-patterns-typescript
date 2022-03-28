import CoinUSDModel from "../models/Coin/USDModel";
import CoinEURModel from "../models/Coin/EURModel";
import CoinCopModel from "../models/Coin/COPModel";
import { ICoin } from "../models/Coin/CoinModel";

import { Request } from "../models/requestModel";
import { ProxyLogger } from "../utils/loggerProxy";
import { CoinAdapter } from "../utils/coinAdapter";

const COIN = {
  COP: CoinCopModel,
  USD: CoinUSDModel,
  EUR: CoinEURModel,
};
export class PaymentService {
  private _log: ProxyLogger;
  constructor() {
    this._log = new ProxyLogger({ name: PaymentService.name });
  }
  public add(request: Request): void {
    const coin: ICoin = COIN[request.coin];

    this._log.warn("Saldo actual: ", coin.balance());

    const currencyAdapter = new CoinAdapter(coin);
    currencyAdapter.add(request.monto, request.coinType);

    this._log.warn("Saldo después abono: ", coin.balance());
  }
}
