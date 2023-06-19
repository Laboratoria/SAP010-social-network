// importamos la funcion que vamos a testear
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  auth
} from 'firebase/auth';
import { loginGoogle, loginUser, signUpUser } from '../src/lib/index';

jest.mock('firebase/auth');

beforeEach(() => {
  jest.clearAllMocks();
});
describe('loginGoogle', () => {
  it('Deve ser uma função de logar com google', async () => {
    signInWithPopup.mockResolvedValueOnce();
    await loginGoogle();
    expect(signInWithPopup).toHaveBeenCalledTimes(1);
  });
});

describe('createUser', () => {
  it('criando um usuário', async () => {
    const user = {
      email: 'test@hotmail.com',
      password: '345678',
    };

    createUserWithEmailAndPassword.mockResolvedValue({ user });
    await signUpUser(user.email, user.password);

    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
      auth,
      user.email,
      user.password,
      auth,
    );
  });
});


describe('loginUser', () => {
  it('logar com e-mail', async () => {
    const email = 'test2@hotmail.com';
    const password = '98765432';
    signInWithEmailAndPassword.mockResolvedValueOnce();
    await loginUser(email, password);
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      auth,
      email,
      password
    );
  });
});
