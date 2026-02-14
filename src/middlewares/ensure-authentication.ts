import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError.js";
import { verify } from "jsonwebtoken";
import { env } from "../env.js";

function EnsureAuthenticationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // retiro o token do header, jogando erros caso ele nao venha
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    throw new AppError("Unauthorized", 401); // Se não há token, não autorizado
  }
  // uso o verify para garantir que o token seja valido
  const decoded = verify(token, env.JWT_SECRET);
  if (typeof decoded === "string") {
    throw new AppError("Unauthorized", 401);
  }

  const userId = decoded.sub;
  if (!userId) {
    throw new AppError("Unauthorized", 401);
  }
  // Se o token for valido, eu vou armazenar o user no request
  req.user = { id: userId };
  next(); // Passa para a próxima função (o controller da rota)
}

export default EnsureAuthenticationMiddleware;
