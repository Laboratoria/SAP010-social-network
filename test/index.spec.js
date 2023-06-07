// import { it } from 'node:test';
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  auth,
} from 'firebase/auth';

import {
  signInWithGoogle,
  signInWithGitHub,
  isUserLoggedIn,
  logIn,
  logOut,
} from '../src/firebase/firebase.js';

const mockAuth = {
  currentUser: {
    displayName: 'Spock',
    email: 'spock@gmail.com',
    uid: '3141592',
  },
};

jest.mock('firebase/auth');

describe('signInWithGoogle', () => {
  it('deveria ser uma função', () => {
    expect(typeof signInWithGoogle).toBe('function');
  });

  it('Deveria logar o usuário com a conta do google', async () => {
    signInWithPopup.mockResolvedValueOnce();
    await signInWithGoogle();
    expect(signInWithPopup).toHaveBeenCalledTimes(1);
  });
});

describe('signInWithGitHub', () => {
  it('deveria ser uma função', () => {
    expect(typeof signInWithGitHub).toBe('function');
  });

  it('Deveria logar o usuário com a conta do GitHub', async () => {
    signInWithPopup.mockResolvedValueOnce();
    await signInWithGitHub();
    expect(signInWithPopup).toHaveBeenCalledTimes(2);
  });
});

describe('isUserLoggedIn', () => {
  it('Deveria retornar true se ele estiver logado', async () => {
    const result = await isUserLoggedIn();
    expect(result).toBe(true);
  });

  it('Deveria retornar false se ele não estiver logado', async () => {
    mockAuth.currentUser = null;
    const result = await isUserLoggedIn();
    expect(result).toBe(false);
  });
});

describe('logIn', () => {
  it('Deveria logar com email e senha corretos', async () => {
    const email = 'spock@gmail.com';
    const password = '3141592';
    signInWithEmailAndPassword.mockResolvedValueOnce();
    await logIn(email, password);
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, email, password);
  });
});

describe('logOut', () => {
  it('Deveria deslogar', async () => {
    await logOut();
    expect(signOut).toHaveBeenCalled();
  });
});
