import { Application } from "express";
import BuilderController from "./builder/controllers/builderController";
import SingletonController from "./singleton/controllers/singletonController";

export const register = (app: Application) => {
  app.post("/builder", BuilderController.handler);
  app.get("/singleton", SingletonController.handler);
};
