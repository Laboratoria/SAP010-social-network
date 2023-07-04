// importamos la funcion que vamos a testear
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  auth,
  signOut,
} from 'firebase/auth';

import {
  signIn,
  signUp,
  signInGoogle,
  checkLogin,
  logout,
} from '../src/lib/index.js';

jest.mock('firebase/auth');

beforeEach(() => {
  jest.clearAllMocks();
});

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
    const user = { id: '123', nome: 'Usuário Teste' };

    onAuthStateChanged.mockImplementation((mockedAuth, callback) => {
      callback(user);
      return () => {};
    });

    const resultado = await checkLogin();

    expect(resultado).toBe(true);
    expect(onAuthStateChanged).toHaveBeenCalledWith(auth, expect.any(Function));
  });
  it('deve retornar false quando o usuário não estiver logado', async () => {
    const user = null;

    onAuthStateChanged.mockImplementation((mockedAuth, callback) => {
      callback(user);
      return () => {};
    });

    const resultado = await checkLogin();

    expect(resultado).toBe(false);
    expect(onAuthStateChanged).toHaveBeenCalledWith(auth, expect.any(Function));
  });
});

describe('logout', () => {
  it('deve fazer logout do feed', () => {
    signOut.mockResolvedValue({ user: {} });
    logout();
    expect(signOut).toHaveBeenCalledTimes(1);
  });
});
