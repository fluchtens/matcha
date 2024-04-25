import { Response } from "express";
import { UserModel } from "./user.model";

export class UserService {
  private userModel: UserModel = new UserModel();

  async getAllUsers(res: Response): Promise<void> {
    const users = await this.userModel.getAllUsers();
    res.status(200).send(users);
  }
}
