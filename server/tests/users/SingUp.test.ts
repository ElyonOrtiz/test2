import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('User - SingUp', ()=> {
   let registerEmail: string | undefined = undefined;
   beforeAll( async () => {
      const resEmail = await testServer
        .post('/cadastrar')
        .send( {
         nome: 'Elyon',
         sobreNome: 'Ortiz',
         email: 'elyon.tes@gmail.com',
         senha: '12345678'
      })

      registerEmail = resEmail.body

      expect(resEmail.statusCode).toEqual(StatusCodes.CREATED);
      expect(typeof resEmail.body).toEqual('number'); 
   });
   
   it('Tenta criar usuário com email já cadastrado', async()=> {
      const res1 = await testServer
         .post('/cadastrar')
         .send({
            nome: 'Elyon',
            sobreNome: 'Ortiz',
            email: 'elyon.tes@gmail.com',
            senha: '12345678'
         })
         expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
         expect(res1.body).toHaveProperty('errors')
   })
} )