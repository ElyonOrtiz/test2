import { Clients } from '@prisma/client';
import { ClientInterface } from '../interfaces/clients';
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { UpdateClientById } from '../../providers/client/Update';
import { updateByIdValidation } from '../../validations/user';

export class UpdateClientController {
    async handle(req: Request, res: Response) {
      try {
          console.log(req.body)
      const client: ClientInterface = req.body;
        const id = parseInt(req.params.id)
        console.log(id)
      if(!req.params){
        res.status(StatusCodes.BAD_REQUEST).json({
          errors:{
            default: 'o id é obrigatório'
          }
        })
      }
      const updateClientById = new UpdateClientById()
      const result = await updateClientById.execute(id, client)
      res.status(StatusCodes.OK).json(result) 
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).send(error)
    }
    }
}