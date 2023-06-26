// importamos la funcion que vamos a testear
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  auth,
} from 'firebase/auth';

import {
  signIn,
  signUp,
  signInGoogle,
  checkLogin,
} from '../src/lib/index.js';

jest.mock('firebase/auth');

describe('signIn', () => {
  it('deve ser uma função', () => {
    expect(typeof signIn).toBe('function');
  });

  it('deve fazer login com email e senha', () => {
    signInWithEmailAndPassword.mockResolvedValue();
    signIn('fernanda@outlook.com', '123456');
    expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
  });
});

describe('signUp', () => {
  it('deve ser uma função', () => {
    expect(typeof signUp).toBe('function');
  });

  it('deve fazer cadastro com email e senha', () => {
    createUserWithEmailAndPassword.mockResolvedValue();
    signUp('fernanda@outlook.com', '123456');
    expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
  });
});

describe('signInGoogle', () => {
  it('deve ser uma função', () => {
    expect(typeof signInGoogle).toBe('function');
  });

  it('deve fazer login com conta google', () => {
    signInWithPopup.mockResolvedValue();
    signInGoogle();
    expect(signInWithPopup).toHaveBeenCalledTimes(1);
  });
});

describe('checkLogin', () => {
  it('deve retornar true quando o usuário estiver logado', async () => {
    // Simular o usuário logado
    const user = { id: '123', nome: 'Usuário Teste' };

    // Mock da função onAuthStateChanged
    onAuthStateChanged.mockImplementation((mockedAuth, callback) => {
      callback(user);
      return () => {};
    });

    // Chamar a função checkLogin
    const resultado = await checkLogin();

    // Verificar se o resultado é true
    expect(resultado).toBe(true);
    // Verificar se a função onAuthStateChanged foi chamada corretamente
    expect(onAuthStateChanged).toHaveBeenCalledWith(auth, expect.any(Function));
  });
  it('deve retornar false quando o usuário não estiver logado', async () => {
    // Simular usuário não logado
    const user = null;

    // Mock da função onAuthStateChanged
    onAuthStateChanged.mockImplementation((mockedAuth, callback) => {
      callback(user);
      return () => {}; // Adicionar um retorno vazio para compatibilidade
    });

    // Chamar a função checkLogin
    const resultado = await checkLogin();

    // Verificar se o resultado é false
    expect(resultado).toBe(false);

    // Verificar se a função onAuthStateChanged foi chamada corretamente
    expect(onAuthStateChanged).toHaveBeenCalledWith(auth, expect.any(Function));
  });
});
