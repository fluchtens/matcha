import bcrypt from "bcrypt";
import { validateOrReject } from "class-validator";
import { Response } from "express";
import { db } from "../database";
import { UserModel } from "../user/user.model";
import { SignUpDto } from "./auth.dtos";

export class AuthService {
  private userModel: UserModel = new UserModel();

  async signup(body: any, res: Response) {
    const username = body.username ? body.username.trim() : "";
    const email = body.email ? body.email.trim() : "";
    const firstName = body.first_name ? body.first_name.trim() : "";
    const lastName = body.last_name ? body.last_name.trim() : "";
    const password = body.password ? body.password.trim() : "";

    if (!username || !email || !firstName || !lastName || !password) {
      res.status(400).send("There are one or more required fields missing from the form.");
      return;
    }

    try {
      const signUpDto = new SignUpDto();
      signUpDto.username = username;
      signUpDto.email = email;
      signUpDto.firstName = firstName;
      signUpDto.lastName = lastName;

      await validateOrReject(signUpDto);
    } catch (error: any) {
      const message = Object.values(error[0].constraints)[0];
      return res.status(400).send(message);
    }

    if (await this.userModel.getUserByUsername(username)) {
      return res.status(409).send("This username is already taken.");
    }

    if (await this.userModel.getUserByEmail(email)) {
      return res.status(409).send("This email is already taken.");
    }

    const hashedPwd = await bcrypt.hash(password, 10);
    const query =
      'INSERT INTO "user"(username, email, first_name, last_name, password) VALUES($1, $2, $3, $4, $5)';
    const values = [username, email, firstName, lastName, hashedPwd];
    await db.query(query, values);

    return res.status(200).send("User succesfully created.");
  }

  async login(body: any, res: Response): Promise<void> {
    const username = body.username;
    const password = body.password;

    res.status(200);
    res.send(`${username} - ${password}`);
  }
}
