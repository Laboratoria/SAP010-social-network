// import { it } from 'node:test';
// import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { expect, jest } from '@jest/globals';

import {
  signInWithGoogle,
} from '../src/firebase/firebase.js';

jest.mock('firebase/auth');

describe('signInWithGoogle', () => {
  it('deveria ser uma função', () => {
    expect(typeof signInWithGoogle).toBe('function');
  });
  const loginGoogle = jest.fn().mockReturnValue({ id: '123456', email: 'meajudajesus@gmail.com' });
  it('deveria logar com o google', () => signInWithGoogle(loginGoogle).then(() => {
    expect(loginGoogle.mock.calls[0][1]).toBe('123456');
  }));

  /* it('Deveria logar o usuário com a conta do google', async () => {
    signInWithPopup.mockResolvedValueOnce();
    await signInWithGoogle();
    expect(signInWithPopup).toHaveBeenCalledTimes(1);
  }); */
});
