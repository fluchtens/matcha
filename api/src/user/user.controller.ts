import { Request, Response } from "express";
import { UserService } from "./user.service";

export class UserController {
  private userService: UserService = new UserService();

  async getProfile(req: Request, res: Response): Promise<void> {
    this.userService.getProfile(req, res);
  }

  async getAllUsers(res: Response): Promise<void> {
    this.userService.getAllUsers(res);
  }
}
