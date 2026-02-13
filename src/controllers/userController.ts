import type { Request, Response } from "express";
import { prisma } from "../database/prisma.js";
import { hash } from "bcrypt";
import z from "zod";

export class UserController {
  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      name: z.string().trim().min(3),
      email: z.string().email(),
      password: z.string().min(6),
    });
    const { name, email, password } = bodySchema.parse(req.body);

    const userExists = await prisma.findByEmail(email);

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await hash(password, 8);

    const user = {
      name,
      email,
      hashedPassword,
    };

    const userCreated = await prisma.create(user);

    return res.status(201).json({ message: "User created" });
  }

  async update(req: Request, res: Response) {
    const { id } = req.user.id; // não existe ainda mas vamos retirar com o middleware de autenticação

    const { name, email, password } = req.body;

    const data: Partial<{ name: string; email: string; password: string }> = {
      name,
      email,
      password,
    };

    const userUpdated = await prisma.update(id, data);

    return res.status(200).json(userUpdated);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.user.id; // não existe ainda mas vamos retirar com o middleware de autenticação

    await prisma.delete(id);

    return res.status(204).json();
  }
}
