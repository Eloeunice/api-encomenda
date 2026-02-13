import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError.js";
import {verify} from "jsonwebtoken"
// verificar o token


class EnsureAuthenticationMiddleware {
    handle(req: Request, res: Response, next: NextFunction){
        if(!req.headers.authorization){
            throw new AppError("Unauthorized", 401);
        }
        const [, token] = req.headers.authorization.split(" ")

        if (typeof token === "undefined") {
            throw new AppError("Unauthorized", 401);
        }

        try {
        verify(token, process.env.JWT_SECRET as string);
        }catch (error) {
            throw new AppError("Unauthorized", 401);
        }
        return next()
    }
}

export {EnsureAuthenticationMiddleware}