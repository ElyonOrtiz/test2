import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { DeleteClientById } from "../../providers/client/Delete";

export class DeleteClientController {
  async handle(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);

      if (!id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          errors: {
            default: 'O parâmetro id é obrigatório'
          }
        });
      }

      const deleteUser = new DeleteClientById();
      const result = await deleteUser.execute(id);

      if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          errors: {
            default: result.message
          }
        });
      }
      return res.sendStatus(StatusCodes.NO_CONTENT);
    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        errors: {
          default: 'Erro ao processar a requisição'
        }
      });
    }
  }
}

