import { Response } from "express";
import { UserService } from "./user.service";

export class UserController {
  private userService: UserService = new UserService();

  async getAllUsers(res: Response): Promise<void> {
    this.userService.getAllUsers(res);
  }
}
