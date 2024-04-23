import { Response } from "express";

export class AuthService {
  async login(body: any, res: Response): Promise<void> {
    const username = body.username;
    const password = body.password;

    res.status(200);
    res.send(`${username} - ${password}`);
  }
}
