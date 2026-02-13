import type { Request, Response } from "express";
import { prisma } from "../database/prisma.js";

class DeliveriesController {
    async create(req: Request, res: Response) {
        const {id} = req.user.id // não existe ainda mas vamos retirar com o middleware de autenticação

        await prisma.create(id)

        return res.status(201).json()
    }
}

export default DeliveriesController