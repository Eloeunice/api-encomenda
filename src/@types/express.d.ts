// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Request } from "express";
interface IUser {
  id: string;
  role?: string;
}

declare global {
  namespace Express {
    interface Request {
      user: IUser;
    }
  }
}
