import { validarEmail, validarSenha, fazerLogin } from '../src/Login/login';

// Cria uma versão da função authLogin para usar nos testes, sem precisar
// acessar o Firebase de verdade.
jest.mock('../src/lib/index', () => ({
  authLogin: jest.fn(async (email, senha) => {
    if (email === 'teste@gmail.com' && senha === '123456') {
      return true;
    }
  
    throw new Error('Error');
  }),
}));

/* describe('myFunction', () => {
  it('debería ser una función', () => {
    expect(typeof myFunction).toBe('function');
  });
}); */

describe('Login', () => {
  test('verifica que o email é válido', () => {
    const email = 'teste@gmail.com';
    const resultado = validarEmail(email);
    expect(resultado).toBe('');
  });

  test('verifica que o email é inválido', () => {
    const email = 'testegmail.com';
    const resultado = validarEmail(email);
    expect(resultado).toBe('Formato de e-mail inválido');
  });

  test('verifica se a senha é válida', () => {
    const senha = '123456';
    const resultado = validarSenha(senha);
    expect(resultado).toBe('');
  });

  test('verifica a senha é inválida', () => {
    const senha = '12345';
    const resultado = validarSenha(senha);
    expect(resultado).toBe('A senha deve ter pelo menos 6 caracteres');
  });

  test('faz login com e-mail inválido e senha válida', () => {
    const email = 'testegmail.com';
    const senha = '123456';

    const login = document.createElement('button');
    const userEmail = document.createElement('input');
    const userSenha = document.createElement('input');
    const txtError = document.createElement('span');

    userEmail.value = email;
    userSenha.value = senha;

    fazerLogin(login, userEmail, userSenha, txtError);
    login.click();

    const resultado = txtError.innerHTML;

    expect(resultado).toBe('Formato de e-mail inválido');
  });

  test('faz login com e-mail válido e senha inválida', () => {
    const email = 'teste@gmail.com';
    const senha = '12345';

    const login = document.createElement('button');
    const userEmail = document.createElement('input');
    const userSenha = document.createElement('input');
    const txtError = document.createElement('span');

    userEmail.value = email;
    userSenha.value = senha;

    fazerLogin(login, userEmail, userSenha, txtError);
    login.click();

    const resultado = txtError.innerHTML;

    expect(resultado).toBe('A senha deve ter pelo menos 6 caracteres');
  });

  test('faz login com e-mail válido e senha válida, mas usuário não existe', async () => {
    const email = 'teste2@gmail.com';
    const senha = '123456';

    const login = document.createElement('button');
    const userEmail = document.createElement('input');
    const userSenha = document.createElement('input');
    const txtError = document.createElement('span');

    userEmail.value = email;
    userSenha.value = senha;

    fazerLogin(login, userEmail, userSenha, txtError);
    login.click();

    await (new Promise((resolve) => setTimeout(resolve, 1)));
    const resultado = txtError.innerHTML;

    expect(resultado).toBe('Usuário ou senha incorretos');
  });

  test('faz login com e-mail válido e senha válida e o usuário existe', async () => {
    const email = 'teste@gmail.com';
    const senha = '123456';

    const login = document.createElement('button');
    const userEmail = document.createElement('input');
    const userSenha = document.createElement('input');
    const txtError = document.createElement('span');

    userEmail.value = email;
    userSenha.value = senha;

    fazerLogin(login, userEmail, userSenha, txtError);
    login.click();

    await (new Promise((resolve) => setTimeout(resolve, 1)));

    expect(window.location.hash).toBe('#feed');
  });
});