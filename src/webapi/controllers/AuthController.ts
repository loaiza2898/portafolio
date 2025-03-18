import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export class AuthController {
  login(req: Request, res: Response) {
    const { username, password } = req.body;
    if (username === "admin" && password === "admin123") {
      const token = jwt.sign({ username }, process.env.JWT_SECRET!, { expiresIn: "1h" });
      res.json({ token });
    } else {
      res.status(401).json({ error: "Credenciales inválidas" });
    }
  }
}