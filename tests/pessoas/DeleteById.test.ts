import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Pessoas - Delete', () => {
  let cidadeId: number | undefined = undefined;
  let accessToken = '';
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
  it ('Cria Registro' , async () => {
    const res1 = await testServer
      .post('/pessoas')
      .set({ authorization: `Bearer ${accessToken}` })
      .send({  
        nome: 'Elyon',
        sobreNome: 'Ortiz',
        email: 'test@gmail.com',
        cidadeId, });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const deleteCid = await testServer
      .delete(`/pessoas/${res1.body}`)
      .set({ authorization: `Bearer ${accessToken}` })
      .send();

    expect(deleteCid.statusCode).toEqual(StatusCodes.NO_CONTENT);

  });

  it ('Tenta apagar registro que não existe' , async () => {
    const res1 = await testServer
      .delete('/pessoas/9999')
      .set({ authorization: `Bearer ${accessToken}` })
      .send();
    
    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');
  });
});