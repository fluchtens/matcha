import { Response } from "express";
import { db } from "../database";
import { UserModel } from "../user/user.model";

export class AuthService {
  private userModel: UserModel = new UserModel();

  async signup(body: any, res: Response): Promise<void> {
    const username = body.username;
    const email = body.email;
    const firstName = body.first_name;
    const lastName = body.last_name;
    const password = body.password;

    if (await this.userModel.getUserByUsername(username)) {
      res.status(409).send("This username is already taken.");
      return;
    }

    if (await this.userModel.getUserByEmail(email)) {
      res.status(409).send("This email is already taken.");
      return;
    }

    const query =
      'INSERT INTO "user"(username, email, first_name, last_name, password) VALUES($1, $2, $3, $4, $5)';
    const values = [username, email, firstName, lastName, password];
    await db.query(query, values);

    res.status(200).send("User succesfully created.");
  }

  async login(body: any, res: Response): Promise<void> {
    const username = body.username;
    const password = body.password;

    res.status(200);
    res.send(`${username} - ${password}`);
  }
}
