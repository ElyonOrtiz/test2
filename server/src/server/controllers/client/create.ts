import { CreateClient } from "../../providers/client/Create";
import { ClientInterface } from "../interfaces/clients";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";


export class CreateClientController{

    async handle(req: Request, res: Response) { 
         try {
  
         const client: ClientInterface = req.body;

    
        const createClient = new CreateClient()

        const result = await createClient.execute(client);

        return res.status(201).json(result);
   } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error);    
   } 
    }

}