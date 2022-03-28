import { Coin } from "./CoinModel";

export class CoinUSDModel extends Coin {
  protected _tasa = {
    USD: 1,
    EUR: 0.91,
    COP: 3792,
  };
}

export default new CoinUSDModel();
