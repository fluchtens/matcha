import { Request, Response } from "express";
import { UserModel } from "./user.model";

export class UserService {
  private userModel: UserModel = new UserModel();

  async getProfile(req: Request, res: Response) {
    const userId = req.session.user?.id;
    if (!userId) {
      return res.status(401).send("You are not logged in.");
    }

    const user = await this.userModel.getUserById(userId);
    if (!user) {
      return res.status(401).send("User not found.");
    }
    return res.status(200).send(user);
  }

  async getAllUsers(res: Response) {
    const users = await this.userModel.getAllUsers();
    return res.status(200).send(users);
  }
}
