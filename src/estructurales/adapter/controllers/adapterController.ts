import { Request, Response } from "express";
import { ProxyLogger } from "../utils/loggerProxy";
import { PaymentService } from "../service/paymentService";

import CoinUSDModel from "../models/Coin/USDModel";
import CoinEURModel from "../models/Coin/EURModel";
import CoinCopModel from "../models/Coin/COPModel";

import {
  RequestBuilder,
  Request as RequestModel,
} from "../models/requestModel";

export class AdapterController {
  public handler(req: Request, res: Response) {
    const log = new ProxyLogger({ name: AdapterController.name });

    log.warn("Request BODY: ", req.body);
    const { coin, coinType, monto } = req.body;

    const requestModel: Readonly<RequestModel> = new RequestBuilder()
      .coin(String(coin || ""))
      .coinType(String(coinType || ""))
      .monto(Number(monto || 0))
      .build();

    if (requestModel.errors) {
      log.error("Request errors: ", requestModel.errors);
      return res.status(400).json(requestModel);
    }

    const paymentService = new PaymentService();
    paymentService.add(requestModel);

    res.send({
      SaldoCoinCOP: CoinCopModel.balance(),
      SaldoCoinUSD: CoinUSDModel.balance(),
      SaldoCoinEUR: CoinEURModel.balance(),
    });
  }
}

export default new AdapterController();
