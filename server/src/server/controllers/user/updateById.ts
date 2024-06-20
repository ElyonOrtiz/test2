import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { updateByIdValidation } from "../../validations/user";
import { UpdateById } from "../../providers/user/updateById";
import { UserInterface } from "../interfaces/user";


export class UpdateUserController {
  async handle(req:Request, res:Response) {
    try {
      const user: UserInterface = req.body;
      const id = req.params
      await updateByIdValidation.parse(req.params)
      if(!req.params){
        res.status(StatusCodes.BAD_REQUEST).json({
          errors:{
            default: 'o id é obrigatório'
          }
        })
      }
      const updateUserById = new UpdateById()
      const result = await updateUserById.execute(Number(id), user)
      res.status(StatusCodes.OK).json(result) 
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).send(error)
    }
  }
}