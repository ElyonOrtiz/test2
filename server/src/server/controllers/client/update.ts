import { Clients } from '@prisma/client';
import { ClientInterface } from '../interfaces/clients';
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { UpdateClientById } from '../../providers/client/Update';
import { updateByIdValidation } from '../../validations/user';

export class UpdateClientController {
    async handle(req: Request, res: Response) {
        try {
      const client: ClientInterface = req.body;
      const id = req.params
      await updateByIdValidation.parse(req.params)
      if(!req.params){
        res.status(StatusCodes.BAD_REQUEST).json({
          errors:{
            default: 'o id é obrigatório'
          }
        })
      }
      const updateClientById = new UpdateClientById()
      const result = await updateClientById.execute(Number(id), client)
      res.status(StatusCodes.OK).json(result) 
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).send(error)
    }
    }
}