import { Request, Response } from "express";
import { StatusModelA } from "../models/statusModelA";
import StatusModelB from "../models/statusModelB";
import { StatusService } from "../service/statusService";
export class SingletonController {
  static cloneInstance() {
    return JSON.parse(
      JSON.stringify({
        A: StatusModelA.Instance,
        B: StatusModelB,
      })
    );
  }
  public handler(req: Request, res: Response) {
    const statusInit = SingletonController.cloneInstance();

    const singletonService = new StatusService();
    singletonService.changueStatus();

    const statusREsponse = SingletonController.cloneInstance();

    res.send({
      statusInit,
      statusREsponse,
    });
  }
}

export default new SingletonController();
