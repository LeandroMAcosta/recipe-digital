import { Request, Response } from "express";
import { User } from "../user/models/User";

export interface Context {
  req: Request;
  res: Response;
  token: String;
  user: User;
}
