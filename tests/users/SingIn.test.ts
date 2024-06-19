import { StatusCodes } from "http-status-codes"
import { testServer } from "../jest.setup"



describe('Login', ()=> {
  beforeAll( async () =>{
    const res1 = await testServer
      .post('/cadastrar')
      .send({
        nome: 'Elyon',
        sobreNome: 'Ortiz',
        email: 'elyon.test@gmail.com',
        senha: '12345678'
      })
    expect(res1.statusCode).toEqual(StatusCodes.CREATED)
  })

  it('login-sucess', async () =>{
    const resp = await testServer
      .post('/entrar')
      .send({
        email: 'elyon.test@gmail.com',
        senha: '12345678'
      })
    expect(resp.status).toEqual(StatusCodes.OK)  
    expect(resp.body).toHaveProperty('accessToken')
  })
})