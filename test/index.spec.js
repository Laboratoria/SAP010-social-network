// import { it } from 'node:test';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { expect } from '@jest/globals';

import {
  isUserLoggedIn, signInWithGoogle,
} from '../src/firebase/firebase.js';

jest.mock('../src/firebase/firebase.js', () => {
  const currentUser = {
    displayName: 'Spock',
    email: 'spoky@gmail.com',
    uid: '3141592',
  };
  const popUp = jest.fn();
  return {
    isUserLoggedIn: async () => currentUser !== null,
    signInWithGoogle: async () => {
      popUp.mockReturnValue(true);
    },
  };
});

describe('isUserLoggedIn', () => {
  it('deve retornar true quando o usuário estiver logado', async () => {
    const result = await isUserLoggedIn();
    expect(result).toBe(true);
  });

  it('deve retornar false quando o usuário não estiver logado', async () => {
    jest.requireMock('../src/firebase/firebase.js').isUserLoggedIn = async () => false;
    const result = await isUserLoggedIn();
    expect(result).toBe(false);
  });
});

describe('signInWithGoogle', () => {
  it('Deveria logar o usuário com a conta do google', async () => {
    signInWithPopup.mockReturnValueOnce();
    GoogleAuthProvider.mockReturnValueOnce();
    await signInWithGoogle();
    expect(signInWithPopup).toHaveBeenCalledTimes();
    expect(signInWithPopup).toHaveBeenCalledWith(undefined, {});
  });
});
