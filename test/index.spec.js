import {
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  auth,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

import {
  setDoc, doc,
} from 'firebase/firestore';

import {
  signInWithGoogle,
  signInWithGitHub,
  isUserLoggedIn,
  logIn,
  logOut,
  registerUserWithAnotherProvider,
  registerUser,
} from '../src/firebase/firebase.js';

const mockAuth = {
  currentUser: {
    displayName: 'Spock',
    email: 'spock@gmail.com',
    uid: '3141592',
    password: 'Senha@123',
  },
};

jest.mock('firebase/auth');
jest.mock('firebase/firestore');

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
    const result = await isUserLoggedIn(mockAuth);
    expect(result).toBe(true);
  });

  it('Deveria retornar false se ele não estiver logado', async () => {
    const result = await isUserLoggedIn(null);
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

describe('registerUserWithAnotherProvider', () => {
  it('Deveria cadastrar um usuário com provedor do Google ou Github', async () => {
    await registerUserWithAnotherProvider();
    expect(setDoc).toHaveBeenCalled();
    expect(doc).toHaveBeenCalled();
  });
  it('Deveria capturar um erro e falhar ao cadastrar um usuário com provedor do Google ou Github', async () => {
    setDoc.mockRejectedValueOnce(new Error('Erro ao cadastrar usuário'));
    try {
      await registerUserWithAnotherProvider();
    } catch (e) {
      expect(e.message).toEqual('Erro ao cadastrar usuário');
    }
  });
});

describe('registerUser', () => {
  it('Deveria cadastrar um usuário com o formulário', async () => {
    const user = mockAuth.currentUser;
    await registerUser(user.displayName, user.displayName, user.email, user.password);
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(auth, user.email, user.password);
    expect(setDoc).toHaveBeenCalled();
    expect(doc).toHaveBeenCalled();
  });
});
