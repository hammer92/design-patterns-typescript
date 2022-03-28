import { Application, Request, Response } from "express";
import * as creacionales from "../creacionales";
import * as estructurales from "../estructurales";
import * as comportamiento from "../comportamiento";
export const register = (app: Application) => {
  app.get("/", (req: Request, res: Response) => {
    res.send("The sedulous hyena ate the antelope!");
  });

  creacionales.register(app);
  estructurales.register(app);
  comportamiento.register(app);
};
