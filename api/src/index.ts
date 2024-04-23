import express, { Request, Response } from "express";
import { AuthController } from "./auth/auth.controller";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.post("/auth/login", (req: Request, res: Response) => {
  const authController = new AuthController();
  authController.login(req, res);
});

app.post("/auth/signup", (req: Request, res: Response) => {
  const authController = new AuthController();
  authController.signup(req, res);
});

app.listen(port, () => {
  console.log(`Match API listening on port ${port}`);
});
