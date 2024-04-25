import { Response } from "express";
import { db } from "../database";
import { UserModel } from "../user/user.model";

export class AuthService {
  private userModel: UserModel = new UserModel();

  checkUsername = (username: string) => {
    if (username.length < 3 || username.length > 16) {
      return { success: false, message: "Username must be between 3 and 16 characters long." };
    }

    const firstLetterRegex = /^[A-Za-z]/;
    if (!firstLetterRegex.test(username)) {
      return { success: false, message: "Username must start with a letter." };
    }

    const usernameRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9_-]+$/;
    if (!usernameRegex.test(username)) {
      return {
        success: false,
        message: "Username can only contain letters, digits, underscores & hyphens.",
      };
    }

    return { success: true, message: null };
  };

  checkEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, message: "Email is invalid." };
    }

    return { success: true, message: null };
  };

  async signup(body: any, res: Response): Promise<void> {
    const username = body.username.trim();
    const email = body.email.trim();
    const firstName = body.first_name.trim();
    const lastName = body.last_name.trim();
    const password = body.password.trim();

    const usernameCheck = this.checkUsername(username);
    if (!usernameCheck.success) {
      res.status(400).send(usernameCheck.message);
      return;
    }

    const emailCheck = this.checkEmail(email);
    if (!emailCheck.success) {
      res.status(400).send(emailCheck.message);
      return;
    }

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
