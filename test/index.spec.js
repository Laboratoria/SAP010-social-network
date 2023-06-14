// importamos la funcion que vamos a testear
import { signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import { signIn, signUp, signInGoogle } from '../src/lib/index.js';

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
