import { Coin } from "./CoinModel";

export class CoinUSDModel extends Coin {
  protected _tasa = {
    USD: 1,
    EUR: 0.8,
    COP: 2,
  };
}

export default new CoinUSDModel();
