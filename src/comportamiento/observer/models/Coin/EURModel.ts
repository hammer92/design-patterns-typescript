import { Coin } from "./CoinModel";

export class CoinEURModel extends Coin {
  protected _tasa = {
    EUR: 1,
    COP: 5000,
    USD: 0.5,
  };
}

export default new CoinEURModel();
