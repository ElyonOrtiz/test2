import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Pessoas - GetAll', () => {
  let cidadeId: number | undefined = undefined;
  let accessToken = ''

  
  beforeAll(async () => {
    const email = 'create-pessoas@gmail.com';
    await testServer.post('/cadastrar').send({
       email, senha: '12345678', nome: 'teste', sobreNome: 'teste'
    });
    const singInRes = await testServer.post('/entrar').send({email, senha:'12345678'});

    accessToken = singInRes.body.accessToken;

    const resCidade = await testServer
      .post('/cidades')
      .set({ authorization: `Bearer ${accessToken}` })
      .send({ nome: 'Teste'});

    cidadeId = resCidade.body;
  }) 
  it ('Busca Registro' , async () => {
    const res1 = await testServer
      .post('/pessoas')
      .set({ authorization: `Bearer ${accessToken}` })
      .send({  
        nome: 'Elyon',
        sobreNome: 'Ortiz',
        email: 'test@gmail.com',
        cidadeId, });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscada = await testServer
      .get('/pessoas')
      .set({ authorization: `Bearer ${accessToken}` })
      .send();
    expect(Number(resBuscada.header['x-total-count'])).toBeGreaterThan(0);
    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body.length).toBeGreaterThan(0);
  });

});
