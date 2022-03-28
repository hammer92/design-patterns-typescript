import { Coin } from "./CoinModel";

export class CoinCopModel extends Coin {
  protected _tasa = {
    COP: 1,
    USD: 0.0004,
    EUR: 0.0002,
  };
}

export default new CoinCopModel();
