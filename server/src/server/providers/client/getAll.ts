import { prisma } from "../../prisma/client"


export class GetAllClients { 

    async execute() { 

        const result = await prisma.clients.findMany({
            select:{
                id: true,
                name: true,
                email: true,
            }
        })
        return result
    }
}