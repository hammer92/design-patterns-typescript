import { Application } from "express";
import observerController from "./observer/controllers/observerController";

import subject from "./observer/utils/subject";
import {
  CoinCOPObserver,
  CoinEURObserver,
  CoinUSDObserver,
} from "./observer/utils/observer";
export const register = (app: Application) => {
  subject.attach(new CoinCOPObserver());
  subject.attach(new CoinEURObserver());
  subject.attach(new CoinUSDObserver());

  app.post("/observer", observerController.handler);
};
