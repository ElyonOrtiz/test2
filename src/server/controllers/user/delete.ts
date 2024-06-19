import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { deleteValidate, userValidate } from "../../validations/user";
import { DeleteById } from "../../providers/user/DeleteById";

export class DeleteUserController {
  async handle(req: Request, res: Response){
    try {
      await deleteValidate.parse(req.params)
      
      const  { id }  = req.params
      if(!id){
        return res.status(StatusCodes.BAD_REQUEST).json({
          errors: {
            default: 'O parâmetro id é obrigatório'
          }
        })  
      }
      const deleteUser = new DeleteById()
      const result = await deleteUser.execute(Number(id))
      if (result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          errors: {
            default: result.message
          }
        });
      }
      return res.status(StatusCodes.NO_CONTENT)

    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).send(error)      
    }
  }

}