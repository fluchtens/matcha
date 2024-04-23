import { Response } from "express";

export class AuthService {
  async signup(body: any, res: Response): Promise<void> {
    const username = body.username;
    const email = body.email;
    const firstName = body.first_name;
    const lastName = body.last_name;
    const password = body.password;

    res.status(200);
    res.send("User succesfully created.");
  }

  async login(body: any, res: Response): Promise<void> {
    const username = body.username;
    const password = body.password;

    res.status(200);
    res.send(`${username} - ${password}`);
  }
}
