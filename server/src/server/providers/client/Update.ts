import { Clients } from '@prisma/client';
import { ClientInterface } from '../../controllers/interfaces/clients';

import { prisma } from '../../prisma/client';




export class UpdateClientById {
  async execute(id: number, client: ClientInterface): Promise<Clients | Error> {
    console.log(id)
    try {
      const result = await prisma.clients.update({
        where: {
          id,
        },
        data: client,
      })
      return result      
    } catch (error) {
       console.error("Erro ao atualizar registro:", error);
      return new Error('Erro ao atualizar registro');
    }
  }
}