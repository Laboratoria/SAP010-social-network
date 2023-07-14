import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from 'firebase/auth'; 
import { loginEmail } from '../src/lib/authUser';
import config from './configfirebase.js';

jest.mock('./configfirebase.js');
jest.mock('firebase/auth');

describe('login', () => {
  it('deverá fazer o login com email e senha e depois  ', async () => {
    const email = 'nome@algo.com';
    const senha = 'jdhjfg5246';
    await loginEmail(email, senha);// verifica a ação do usuário
    expect(window.location.hash).toBe('#feed');// verifica o direcionamento esperado
  });
  it('testar para login com email e senha incorreta ', async () => {
    const email = 'emailerrado@algo.com';
    const senhaIncorreta = 'senhaerrada';
    await loginEmail(email, senhaIncorreta);// verifica a ação do usuário
    expect(window.location.hash).toBe('');// verifica o direcionamento esperado
  });
});
// it com os erros (no it colocar que tem que lidar com os erros)
// testes assincronos (await e try catch)
// usar o fail na segunda parte
// na terceira parte usar o cath (verificar se o erro é do tipo esperado e
// se a mensagem de erro é a esperada)
