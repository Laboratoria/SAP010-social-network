// importamos la funcion que vamos a testear
import {  loginUser, loginGoogle } from '../src/lib/index';

jest.mock('../src/lib/firebase.js')

describe('loginGoogle', () => {
  it('Deve ser uma função de logar com google', () => {
    expect(typeof loginGoogle).toBe('function');
  });
});
it('Deve chamar a função signInWithPopup ao ser executado', () => {
  loginGoogleGoogle();
  expect(signInWithPopup).toHaveBeenCalledTimes(1);
});
