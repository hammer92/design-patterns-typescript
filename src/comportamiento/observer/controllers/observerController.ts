import { Request, Response } from "express";
import {
  RequestBuilder,
  Request as RequestModel,
} from "../models/requestModel";
import { ProxyLogger } from "../utils/loggerProxy";

import subject from "../utils/subject";

import CoinUSDModel from "../models/Coin/USDModel";
import CoinEURModel from "../models/Coin/EURModel";
import CoinCopModel from "../models/Coin/COPModel";
export class ObserverController {
  public handler(req: Request, res: Response) {
    const log = new ProxyLogger({ name: ObserverController.name });
    log.warn("Request BODY: ", req.body);
    const { credit, debit, monto } = req.body;

    const requestModel: Readonly<RequestModel> = new RequestBuilder()
      .credit(String(credit || "")) // disminuir el saldo
      .debit(String(debit || "")) // aumentar el saldo
      .monto(Number(monto || 0))
      .build();

    if (requestModel.errors) {
      log.error("Request errors: ", requestModel.errors);
      return res.status(400).json(requestModel);
    }

    if (requestModel.debit === requestModel.credit) {
      log.error("Débito y Crédito no pueden ser lo mismo");
      return res
        .status(400)
        .json({ message: "Débito y Crédito no pueden ser lo mismo" });
    }

    subject.someBusinessLogic(requestModel);

    res.send({
      SaldoCoinCOP: CoinCopModel.balance(),
      SaldoCoinUSD: CoinUSDModel.balance(),
      SaldoCoinEUR: CoinEURModel.balance(),
    });
  }
}

export default new ObserverController();
