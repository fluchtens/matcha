import express, { Request, Response } from "express";
import session from "express-session";
import { AuthController } from "./auth/auth.controller";
import { UserController } from "./user/user.controller";

const app = express();
const port = 3000;

declare module "express-session" {
  interface SessionData {
    user: { id: number };
  }
}

app.use(express.json());

app.use(
  session({
    secret: "1d1479e05785e874dbe22c7b533e446f",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 2 * 60 * 60 * 1000,
    },
  })
);
app.post("/auth/login", (req: Request, res: Response) => {
  const authController = new AuthController();
  authController.login(req, res);
});

app.post("/auth/signup", (req: Request, res: Response) => {
  const authController = new AuthController();
  authController.signup(req, res);
});

app.get("/user/profile", (req: Request, res: Response) => {
  const userController = new UserController();
  userController.getProfile(req, res);
});

app.get("/user/all", (req: Request, res: Response) => {
  const userController = new UserController();
  userController.getAllUsers(res);
});

app.listen(port, () => {
  console.log(`Match API listening on port ${port}`);
});
