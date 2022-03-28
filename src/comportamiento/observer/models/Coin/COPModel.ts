import { Coin } from "./CoinModel";

export class CoinCopModel extends Coin {
  protected _tasa = {
    COP: 1,
    USD: 0.00026,
    EUR: 0.00024,
  };
}

export default new CoinCopModel();
