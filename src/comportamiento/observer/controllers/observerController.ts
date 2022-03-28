import { Request, Response } from "express";
import {
  RequestBuilder,
  Request as RequestModel,
} from "../models/requestModel";
import { ProxyLogger } from "../utils/loggerProxy";

import subject from "../utils/subject";

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

    subject.someBusinessLogic(requestModel);

    res.send("requestModel");
  }
}

export default new ObserverController();
