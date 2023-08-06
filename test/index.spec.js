import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';

import {
  cadastrarUsuario,
  atualizarNomeDoUsuario,
  loginUsuario,
  sairDaConta,
  redefinirSenha,
  exibirPosts,
  adicionarPost,
} from '../src/lib/firebase';

jest.mock('firebase/auth');
jest.mock('../src/lib/firebase-config');

describe(cadastrarUsuario, () => {
  it('deve ser uma função', () => {
    expect(typeof cadastrarUsuario).toBe('function');
  });

  it('deve cadastrar via firebase', () => {
    const email = 'emailexemplo@gmail.com';
    const senha = '123456';
    cadastrarUsuario(email, senha);
    expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
  });
});

describe(atualizarNomeDoUsuario, () => {
  it('deve ser uma função', () => {
    expect(typeof atualizarNomeDoUsuario).toBe('function');
  });

  it('deve atualizar nome do usuario ao cadastrar', () => {
    const nome = 'amandasca';
    atualizarNomeDoUsuario(nome);
    expect(updateProfile).toHaveBeenCalledTimes(1);
  });
});

describe(loginUsuario, () => {
  it('deve ser uma função', () => {
    expect(typeof loginUsuario).toBe('function');
  });

  it('deve logar usuario via firebase', () => {
    const email = 'userexemplo@gmail.com';
    const senha = '1234567';
    loginUsuario(email, senha);
    expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
  });
});

describe(sairDaConta, () => {
  it('deve ser uma função', () => {
    expect(typeof sairDaConta).toBe('function');
  });

  it('deve deslogar o usuario', () => {
    sairDaConta();
    expect(signOut).toHaveBeenCalledTimes(1);
  });
});

describe(redefinirSenha, () => {
  it('deve ser uma função', () => {
    expect(typeof redefinirSenha).toBe('function');
  });

  it('deve redefinir a senha do usuario', () => {
    const email = 'redefinirsenha@gmail.com';
    redefinirSenha(email);
    expect(sendPasswordResetEmail).toHaveBeenCalledTimes(1);
  });
});

describe(adicionarPost, () => {
  it('deve adicionar o post ao firebase', () => {
    expect(typeof adicionarPost).toBe('function');
  });
});

describe(exibirPosts, () => {
  it('deve ser uma função', () => {
    expect(typeof exibirPosts).toBe('function');
  });
});
