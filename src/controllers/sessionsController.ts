import type { Request, Response } from "express";
import { prisma } from "../database/prisma.js";
import { authConfig } from "../config/auth.js";
import { sign, type SignOptions } from "jsonwebtoken";
class SessionsController {
  async create(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await prisma.user.findByEmail(email);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const passwordMatch = await prisma.user.comparePassword(
      password,
      user.password,
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const { secret } = authConfig.jwt;

    const options: SignOptions = {
      subject: String(user.id),
      expiresIn: "1d",
    };
    const token = sign({ role: user.role ?? "customer" }, secret, options);

    return res.status(200).json(token);
  }
}

export { SessionsController };
