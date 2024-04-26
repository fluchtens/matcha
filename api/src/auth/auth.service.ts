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

  checkFirstName = (firstName: string) => {
    if (firstName.length < 3 || firstName.length > 50) {
      return { success: false, message: "First name must be between 3 and 50 characters long." };
    }
    return { success: true, message: null };
  };

  checkLastName = (lastName: string) => {
    if (lastName.length < 3 || lastName.length > 50) {
      return { success: false, message: "Last name must be between 3 and 50 characters long." };
    }
    return { success: true, message: null };
  };

  async signup(body: any, res: Response): Promise<void> {
    const username = body.username ? body.username.trim() : "";
    const email = body.email ? body.email.trim() : "";
    const firstName = body.first_name ? body.first_name.trim() : "";
    const lastName = body.last_name ? body.last_name.trim() : "";
    const password = body.password ? body.password.trim() : "";

    if (!username || !email || !firstName || !lastName || !password) {
      res.status(400).send("There are one or more required fields missing from the form.");
      return;
    }

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

    const firstNameCheck = this.checkFirstName(firstName);
    if (!firstNameCheck.success) {
      res.status(400).send(firstNameCheck.message);
      return;
    }

    const lastNameCheck = this.checkLastName(lastName);
    if (!lastNameCheck.success) {
      res.status(400).send(lastNameCheck.message);
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
