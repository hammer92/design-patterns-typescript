import { Request, Response } from "express";
import { ProxyLogger } from "../utils/loggerProxy";

export class ProxyController {
  public handler(req: Request, res: Response) {
    const log = new ProxyLogger({ name: ProxyController.name });

    // log.attachTransport("logs.txt");
    log.silly("I am a silly log.");
    log.trace("I am a trace log with a stack trace.");
    log.debug("I am a debug log.");
    log.info("I am an info log.");
    log.warn("I am a warn log with a json object:", {
      foo: "bar",
      password: "swordfish",
    });
    log.error("I am an error log.");

    res.send({ status: "ok", className: ProxyController.name });
  }
}

export default new ProxyController();
