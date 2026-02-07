import type { Request, Response } from "express";
import {hash} from "bcrypt";
import z from "zod";


export class UserController {
    async create(req: Request, res: Response) {

        const bodySchema = z.object({
            name: z.string().trim().min(3),
            email: z.string().email(),
            password: z.string().min(6)
        })
        const { name, email, password } = bodySchema.parse(req.body);

        const user = {
            name,
            email,
            password
        }

        const userCreated =await UserService.create(user);

        return res.status(201).json(userCreated);
    }

    async update(req: Request, res: Response) {
    const {id} = req.user.id // não existe ainda mas vamos retirar com o middleware de autenticação

    const {name, email, password} = req.body

    const data: Partial<{ name: string, email: string, password: string }> = {
        name,
        email,
        password
    }

    const userUpdated = await UserService.update(id, data)

    return res.status(200).json(userUpdated)

}

    async delete(req: Request, res: Response) {
        const {id} = req.user.id // não existe ainda mas vamos retirar com o middleware de autenticação

        await UserService.delete(id)

        return res.status(204).json()
    }
}