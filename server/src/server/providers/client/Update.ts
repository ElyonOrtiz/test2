import { ClientInterface } from '../../controllers/interfaces/clients';

import { prisma } from '../../prisma/client';




export class UpdateClientById {
  async execute(id:number, client:ClientInterface ): Promise< void | Error > {
    try {
      const result = await prisma.clients.update({
        where: {
          id,
        },
        data: client,
      })
      if (result) return
      
      return new Error ('Erro ao atualizar registro')
    } catch (error) {
      return new Error ('Erro ao atualizar registro')
    }
  }
}