import { User } from '@prisma/client';
import { UserInterface } from '../../controllers/interfaces/user';
import { prisma } from '../../prisma/client';


export class CreateUser {
  async execute({ name, email, password}: UserInterface ): Promise<Omit<User, 'password'> | Error >{
    // create new user 
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password,
      type: 'admin'
    },
    select:{
      id: true,
      name: true,
      email: true,
      password: false,
      createdAt: true,
      updatedAt: true
    }
  })
  return user
}
}