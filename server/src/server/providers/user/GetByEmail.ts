import { UserInterface } from '../../controllers/interfaces/user';
import { prisma } from '../../prisma/client';
import { User } from '@prisma/client';

export class getByEmail {

  async execute(email:string): Promise< User | Error> {
   try {
    const result = await prisma.user.findUnique({
      where:{
        email,
      },
    })
    if (result) return result
    return new Error('Email ou senha invalidos, tente novamente ou cadastre-se')
    } catch (error) {
      return new Error('Não foi possivel se conectar com o banco de dados' + error.message) 
    }  
  }
}