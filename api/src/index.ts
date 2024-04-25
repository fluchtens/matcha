import express, { Request, Response } from "express";
import { AuthController } from "./auth/auth.controller";
import { UserController } from "./user/user.controller";

const app = express();
const port = 3000;

app.use(express.json());

app.post("/auth/login", (req: Request, res: Response) => {
  const authController = new AuthController();
  authController.login(req, res);
});

app.post("/auth/signup", (req: Request, res: Response) => {
  const authController = new AuthController();
  authController.signup(req, res);
});

app.get("/user/all", (req: Request, res: Response) => {
  const userController = new UserController();
  userController.getAllUsers(res);
});

app.listen(port, () => {
  console.log(`Match API listening on port ${port}`);
});
