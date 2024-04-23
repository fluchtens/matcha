import { Response } from "express";
import { db } from "../database";

export class AuthService {
  async signup(body: any, res: Response): Promise<void> {
    const username = body.username;
    const email = body.email;
    const firstName = body.first_name;
    const lastName = body.last_name;
    const password = body.password;

    const query =
      'INSERT INTO "user"(username, email, first_name, last_name, password) VALUES($1, $2, $3, $4, $5)';
    const values = [username, email, firstName, lastName, password];
    await db.query(query, values);

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
