import { CreateClient } from "../../providers/client/Create";
import { ClientInterface } from "../interfaces/clients";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";

export class CreateClientController {
  async handle(req: Request, res: Response) { 
    try {
      const { name, email }: ClientInterface = req.body; // Verifique se req.body está estruturado corretamente
      const createClient = new CreateClient();
      const result = await createClient.execute({ name, email });
      return res.status(StatusCodes.CREATED).json(result);
    } catch (error) {
      console.error("Erro ao criar cliente:", error);
      return res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    } 
  }
}