import {
  createUserWithEmailAndPassword,
  auth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from 'firebase/auth';
import {
  newUser,
  authLogin,
  authLoginGoogle,
  authLoginFacebook,
} from '../src/lib/index.js';

jest.mock('firebase/auth');

test('login do usuário', async () => {
  const email = 'josédasilva@gmail.com';
  const senha = '123456';

  await authLogin(email, senha);

  expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, email, senha);
});

test('Deveria logar o usuário com sua conta do Google', async () => {
  signInWithPopup.mockResolvedValueOnce();
  await authLoginGoogle();
  expect(GoogleAuthProvider).toHaveBeenCalledTimes(1);
});

test('Deveria logar o usuário com sua conta do Facebook', async () => {
  signInWithPopup.mockResolvedValueOnce();
  await authLoginFacebook();
  expect(FacebookAuthProvider).toHaveBeenCalledTimes(1);
});

test('Criar novo usuario', async () => {
  const email = 'josédasilva@gmail.com';
  const senha = '123456';

  await newUser(email, senha);

  expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(auth, email, senha);
});
