import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { authorization } = request.headers;


  //se a constante não exitir faça
  if (!authorization?.length) {
    return response.sendStatus(401);
  }

  //se existir pegar o token
  const token = authorization.replace("Bearer","").trim();

  try {
    const seed = process.env.JWT_SECRET;
    const data = jwt.verify(token, seed!);

    const { id } = data as TokenPayload;

    request.userId = id;

    return request.userId, next();
  } catch(error) {

    return response.sendStatus(401);
  }
}
