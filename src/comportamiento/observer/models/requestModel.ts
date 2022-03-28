import Joi, { valid } from "joi";

const validCredit = Joi.string().max(3).valid("COP", "USD", "EUR");
const validDebit = Joi.string().max(3).valid("COP", "USD", "EUR", "");
const validMonto = Joi.number().min(0).required();

const requestSchema = Joi.object({
  credit: validCredit,
  debit: validDebit,
  monto: validMonto,
});

export interface Request {
  credit: string;
  debit: string;
  monto: number;
  errors?: string[];
}

export class RequestBuilder {
  private _request: Request;

  constructor() {
    this._request = {
      credit: "",
      debit: "",
      monto: 0,
    };
  }

  credit(credit: string): RequestBuilder {
    this._request.credit = credit;
    return this;
  }

  debit(debit: string): RequestBuilder {
    this._request.debit = debit;
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
