import { prisma } from "../../prisma/client";

export class DeleteClientById{
  async execute(id: number): Promise <void | Error> {
   try {
    const result = await prisma.clients.delete({
      where:{
        id,
      }
   
    })
    if (result) return
    return new Error('Erro ao apagar registro, tente novamente')
   } catch (error) {
    return new Error('Erro ao apagar registro, tente novamente')   
   }
  }
}