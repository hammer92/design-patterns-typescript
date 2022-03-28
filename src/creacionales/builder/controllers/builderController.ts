import { Request, Response } from "express";

import { UserBuilder, User } from "../models/userModel";

export class BuilderController {
  public handler(req: Request, res: Response) {
    const { name, email } = req.body;

    const user: Readonly<User> = new UserBuilder()
      .name(String(name || ""))
      .email(String(email || ""))
      .build();

    res.send(user);
  }
}

export default new BuilderController();
