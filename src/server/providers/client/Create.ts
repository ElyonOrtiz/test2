import { Clients } from '@prisma/client';
import { prisma } from '../../prisma/client';
import { ClientInterface } from '../../controllers/interfaces/clients';


export class CreateClient {
  async execute({ name, email, }: ClientInterface ): Promise<Clients | Error >{
    // create new user 
  const client = await prisma.clients.create({
    data: {
      name,
      email,
    },
    select:{
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true
    }
  })
      return client;
  }
}