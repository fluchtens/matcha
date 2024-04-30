import { Request, Response } from "express";
import { AuthService } from "./auth.service";

export class AuthController {
  private authService: AuthService = new AuthService();

  async signup(req: Request, res: Response): Promise<void> {
    const body: any = req.body;

    this.authService.signup(body, res);
  }

  async login(req: Request, res: Response): Promise<void> {
    const body: any = req.body;

    this.authService.login(body, req, res);
  }
}
