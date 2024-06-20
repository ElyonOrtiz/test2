import { PasswordCrypto } from './../src/middlewares/services/PassWordCrypto';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function seed() {
  const users = [
   { name: 'admin',
     email: 'admin@admin.com',
     password: await PasswordCrypto.hashPassword('admin'),
      status: true,
    },
    {
      name: 'user',
      email: 'user@user.com',
      password: await PasswordCrypto.hashPassword('SuperUser'),
      status: true,
    }
  ]
  
     
  const clientNames: string[] = [];

  for (let i = 0; i < 100; i++) {
    clientNames.push(`client${i + 1}`);
  }

  for (let i = 0; i < users.length; i++) {
    await prisma.user.create({
      data: {
        email: users[i].email,
        type: "admin", // Adjust user type as needed
        name: users[i].name,
        password: users[i].password, // Replace with a secure hashing mechanism
      },
    });
  }

  for (const name of clientNames) {
    await prisma.clients.create({
      data: {
        name,
        email: `${name}@example.com`, // Generate unique emails for clients
      },
    });
  }

  console.log(`Database seeded with 2 users and 100 clients.`);
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
