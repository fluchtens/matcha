import { Request, Response } from "express";

export class AuthController {
  async signIn(req: Request, res: Response) {
    const body = req.body;
    const username = body.username;
    const password = body.password;

    res.send("This is the list of users");
  }
}
