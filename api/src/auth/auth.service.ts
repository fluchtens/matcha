import bcrypt from "bcrypt";
import { validateOrReject } from "class-validator";
import { Request, Response } from "express";
import { db } from "../database";
import { UserModel } from "../user/user.model";
import { LoginDto, SignUpDto } from "./auth.dtos";

export class AuthService {
  private userModel: UserModel = new UserModel();

  async signup(body: any, res: Response) {
    const username = body.username ? body.username.trim() : "";
    const email = body.email ? body.email.trim() : "";
    const firstName = body.first_name ? body.first_name.trim() : "";
    const lastName = body.last_name ? body.last_name.trim() : "";
    const password = body.password ? body.password.trim() : "";

    if (!username || !email || !firstName || !lastName || !password) {
      return res
        .status(400)
        .json({ message: "There are one or more required fields missing from the form." });
    }

    try {
      const signUpDto = new SignUpDto();
      signUpDto.username = username;
      signUpDto.email = email;
      signUpDto.firstName = firstName;
      signUpDto.lastName = lastName;
      signUpDto.password = password;

      await validateOrReject(signUpDto);
    } catch (error: any) {
      const message = Object.values(error[0].constraints)[0];
      return res.status(400).json({ message: message });
    }

    if (await this.userModel.getUserByUsername(username)) {
      return res.status(409).json({ message: "This username is already taken." });
    }

    if (await this.userModel.getUserByEmail(email)) {
      return res.status(409).json({ message: "This email is already taken." });
    }

    const hashedPwd = await bcrypt.hash(password, 10);
    const query =
      'INSERT INTO "user"(username, email, first_name, last_name, password) VALUES($1, $2, $3, $4, $5)';
    const values = [username, email, firstName, lastName, hashedPwd];
    await db.query(query, values);

    return res.status(200).json({ message: "User succesfully created." });
  }

  async login(body: any, req: Request, res: Response) {
    const username = body.username;
    const password = body.password;

    try {
      const loginDto = new LoginDto();
      loginDto.username = username;
      loginDto.password = password;

      await validateOrReject(loginDto);
    } catch (error: any) {
      const message = Object.values(error[0].constraints)[0];
      return res.status(400).json({ message: message });
    }

    const user = await this.userModel.getUserByUsername(username);
    if (!user) {
      return res.status(401).json({ message: "Incorrect username or password." });
    }

    const matchPwd = await bcrypt.compare(password, user.password);
    if (!matchPwd) {
      return res.status(401).json({ message: "Incorrect username or password." });
    }

    req.session.user = { id: user.id };

    return res.status(200).json({ message: "User succesfully connected." });
  }
}
