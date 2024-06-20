import supertest from 'supertest';
import { server } from '../src/server/Server';
import { Knex } from '../src/server/database/knex';
import { prisma } from '../src/server/prisma/client';


beforeAll(async () => {
  await prisma.latest();
});

afterAll(async () => {
  await Knex.destroy();
  await Knex.seed.run();
});


export const testServer = supertest(server);