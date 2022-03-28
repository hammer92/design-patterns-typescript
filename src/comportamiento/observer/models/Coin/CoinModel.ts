export interface ICoin {
  get saldo(): any;
  get tasa(): any;
  balance(): string;
  debit(monto: number): void;
  credit(monto: number): void;
}

export abstract class Coin implements ICoin {
  private _saldo: number = 100000;
  public get saldo(): number {
    return this._saldo;
  }
  public set saldo(value: number) {
    this._saldo = value;
  }

  protected _tasa = {
    EUR: 1,
    COP: 1,
    USD: 1,
  };
  public get tasa() {
    return this._tasa;
  }

  balance(): string {
    return this._saldo.toLocaleString("es-CO", { maximumFractionDigits: 1 });
  }
  debit(monto: number): void {
    this._saldo += monto;
  }
  credit(monto: number): void {
    this._saldo -= monto;
  }
}
