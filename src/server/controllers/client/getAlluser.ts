
import { Request, Response } from "express";
import { GetAllClients } from "../../providers/client/getAll";
import { StatusCodes } from "http-status-codes";
export class GetAllClientsController {
    async handle(req: Request, res: Response) {
        try {
            const getAllClients = new GetAllClients()
            const result = await getAllClients.execute()
        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).send(error)
        }
    }
}