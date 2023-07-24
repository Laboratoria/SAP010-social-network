/* eslint-disable no-unused-vars */
import {
  createUserWithEmailAndPassword, getAuth, signInWithPopup, signInWithEmailAndPassword, signOut,
} from 'firebase/auth';
import {
  createUser, loginGoogle, login, deslogar,
} from '../src/pages/serviceFirebase/firebaseAuth.js';

jest.mock('firebase/auth');

const mockUser = {
  user: {
    nome: 'Camila',
    email: 'test@example.com',
    senha: '123456',
  },
};

describe('createUser is a function', () => {
  it('É uma função', () => {
    expect(typeof createUser).toBe('function');
  });
  it('Criou um novo usuário', async () => {
    const authMock = getAuth();
    createUserWithEmailAndPassword.mockResolvedValue(mockUser);
    const nome = 'Camila';
    const email = 'test@example.com';
    const senha = '123456';
    await createUser(nome, email, senha);

    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(authMock, email, senha);
  });
});

describe('signInWithEmailAndPassword', () => {
  it('deve logar com o usuario criado', async () => {
    signInWithEmailAndPassword.mockResolvedValueOnce();
    const email = 'email@aleatorio.com';
    const senha = 'senhaaleatoria';
    await login(email, senha);
    expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(undefined, email, senha);
  });
});

describe('Login com o Google', () => {
  it('deveria ser uma função', () => {
    expect(typeof loginGoogle).toBe('function');
  });

  it('Deveria logar com o Google', async () => {
    signInWithPopup.mockResolvedValueOnce();
    // permite que defina o valor de retorno de uma função mockada como uma Promise resolvida
    await loginGoogle();
    expect(signInWithPopup).toHaveBeenCalledTimes(1);
  });
});

describe('deslogar', () => {
  it('deveria ser uma função', () => {
    expect(typeof deslogar).toBe('function');
  });

  it('deve deslogar o usuário', async () => {
    // Chama a função deslogar
    await deslogar();

    // Verifica se a função signOut foi chamada
    expect(signOut).toHaveBeenCalled();
    // Verifica se a função signOut foi chamada apenas uma vez
    expect(signOut).toHaveBeenCalledTimes(1);
  });

  // it('Usuário não autenticado', async () => {
  //   // Mock do getAuth para retornar um valor nulo (usuário não autenticado)
  //   jest.spyOn(getAuth, 'getAuth').mockReturnValue(null);

  //   const signOutMock = jest.fn();
  //   signOut.mockResolvedValue(signOutMock);

  //   await deslogar();

  //   // Verifica se a função signOut não foi chamada, pois o usuário não está autenticado
  //   expect(signOutMock).not.toHaveBeenCalled();
  // });
});
