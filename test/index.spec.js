// import { it } from 'node:test';
import { signInWithPopup } from 'firebase/auth';

import {
  signInWithGoogle,
  signInWithGitHub,
} from '../src/firebase/firebase.js';

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
