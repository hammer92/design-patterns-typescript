import Joi, { valid } from "joi";

const validCoinType = Joi.string().max(3).required().valid("COP", "USD", "EUR");
const validCoin = Joi.string().max(3).valid("COP", "USD", "EUR", "");
const validValor = Joi.number().min(0).required();

const requestSchema = Joi.object({
  coinType: validCoinType,
  coin: validCoin,
  monto: validValor,
});

export interface Request {
  coinType: string;
  coin: string;
  monto: number;
  errors?: string[];
}

export class RequestBuilder {
  private _request: Request;

  constructor() {
    this._request = {
      coinType: "",
      coin: "",
      monto: 0,
    };
  }

  coinType(coinType: string): RequestBuilder {
    this._request.coinType = coinType;
    return this;
  }

  coin(coin: string): RequestBuilder {
    this._request.coin = coin;
    return this;
  }

  monto(monto: number): RequestBuilder {
    this._request.monto = monto;
    return this;
  }

  build(): Readonly<Request> {
    const { error, value } = requestSchema.validate(this._request);

    if (Joi.isError(error)) {
      value.errors = error.details.map(({ message }) => message);
    }
    return value;
  }
}
