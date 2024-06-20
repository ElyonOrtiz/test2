
import { prisma } from '../../prisma/client';
import { UserInterface } from '../../controllers/interfaces/user';




export class UpdateById {
  async execute(id:number, user:UserInterface ): Promise< void | Error > {
    try {
      const result = await prisma.user.update({
        where: {
          id,
        },
        data: user,
      })
      if (result) return
      
      return new Error ('Erro ao atualizar registro')
    } catch (error) {
      return new Error ('Erro ao atualizar registro')
    }
  }
}