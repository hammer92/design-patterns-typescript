import { Coin } from "./CoinModel";

export class CoinEURModel extends Coin {
  protected _tasa = {
    EUR: 1,
    COP: 4167,
    USD: 1.1,
  };
}

export default new CoinEURModel();
