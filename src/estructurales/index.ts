import { Application } from "express";
import ProxyController from "./proxy/controllers/proxyController";
import adapterController from "./adapter/controllers/adapterController";
export const register = (app: Application) => {
  app.get("/proxy", ProxyController.handler);
  app.post("/adapter", adapterController.handler);
};
