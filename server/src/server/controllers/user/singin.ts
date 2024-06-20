import { StatusCodes } from "http-status-codes";
import { getByEmail } from "../../providers/user/GetByEmail";
import { Request, Response } from "express";
import { singInValidate } from "../../validations/singin";
import { PasswordCrypto } from "../../../middlewares/services/PassWordCrypto";
import { JWTService } from "../../../middlewares/services/JWTService";


export class SingInController {
  async handle(req: Request, res: Response){
    try {
      await singInValidate.parse(req.body)

      const {email, password} = req.body;      
      const singIn = new getByEmail()
      const user = await singIn.execute(email)

      if ( user instanceof Error ){
        console.log(user)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          errors: {
            default: user.message,
          }
        })
      }
      const passwordMatch = await PasswordCrypto.verifyPassword(password, user.password)
      if(!passwordMatch) {
        return res.status(StatusCodes.BAD_REQUEST).json({
           errors: {
             default: 'email ou senha invalidos, tente novamente ou cadastre-se'
           }
         })
      }else{
        const  accessToken = JWTService.singn({uid: user.id})
        if(accessToken === 'JWT_SECRET_NOT_FOUND'){
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
              default: 'Erro ao gerrar token de acesso'
            }
          })
        }
        return res.status(200).json({accessToken, });
      }
     
    } catch (error){
      res.status(StatusCodes.BAD_REQUEST).send(error)
    }
  }
}