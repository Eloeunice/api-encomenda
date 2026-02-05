import { Request, Response } from "express";


export class UserController {
    async create(req: Request, res: Response) {
        const { name, email, password } = req.body;

        const user = {
            name,
            email,
            password
        }
    }
}