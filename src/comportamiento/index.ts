import { Application } from "express";
import observerController from "./observer/controllers/observerController";

import subject from "./observer/utils/subject";
import { Observer } from "./observer/utils/observer";
export const register = (app: Application) => {
  subject.attach(new Observer());

  app.post("/observer", observerController.handler);
};
