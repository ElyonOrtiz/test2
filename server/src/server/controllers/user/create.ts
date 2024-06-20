import bcrypt  from 'bcrypt';
import { Request, Response } from "express";
import { CreateUser } from "../../providers/user/Create";
import { UserInterface } from "../interfaces/user";
import { StatusCodes } from "http-status-codes";



export class CreateUserController {
  async handle(req: Request, res: Response){
   try {
  
    const user: UserInterface = req.body;

    const hashPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashPassword
    
    const createUser = new CreateUser()

    const result = await createUser.execute(user);

    return res.status(201).json(result);
   } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error);    
   }
  }
}