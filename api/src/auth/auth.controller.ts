import { Request, Response } from "express";
import { AuthService } from "./auth.service";

export class AuthController {
  private authService: AuthService = new AuthService();

  async login(req: Request, res: Response): Promise<void> {
    const body: any = req.body;

    this.authService.login(body, res);
  }
}
