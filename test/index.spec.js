/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import {
  createUserWithEmailAndPassword, getAuth, signInWithPopup, signInWithEmailAndPassword, signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  doc, updateDoc, db, collection, addDoc,
} from 'firebase/firestore';
import {
  criarUsuario, loginGoogle, login, deslogar, editarPost, usuarioAtual,
} from '../src/pages/serviceFirebase/firebaseAuth.js';

jest.mock('firebase/auth');
jest.mock('firebase/firestore');

beforeEach(() => {
  jest.clearAllMocks();
});

const mockUser = {
  user: {
    nome: 'Camila',
    email: 'test@example.com',
    senha: '123456',
  },
};

describe('criarUsuario is a function', () => {
  it('É uma função', () => {
    expect(typeof criarUsuario).toBe('function');
  });

  it('Criou um novo usuário', async () => {
    const authMock = getAuth();
    const testEmail = 'test@example.com'; // Renomeie a variável email para evitar conflito de escopo
    const senha = '123456';
    createUserWithEmailAndPassword.mockResolvedValue(mockUser);
    await criarUsuario(testEmail, senha);

    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(authMock, testEmail, senha);
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
});

describe('Editar Post', () => {
  it('Deveria atualizar o post do usuário', async () => {
    const postId = 'post_id_mock';
    const novaMensagem = 'Nova mensagem do post';

    doc.mockReturnValueOnce('docRef_mock');
    updateDoc.mockResolvedValueOnce();

    await editarPost(postId, novaMensagem);

    expect(doc).toHaveBeenCalledWith(db, 'Post', postId);
    expect(updateDoc).toHaveBeenCalledWith('docRef_mock', { mensagem: novaMensagem });
  });
});

  describe('usuarioAtual (verifica se o usuário está logado)', () => {
    it('Deveria retornar o usuário autenticado', () => {
      usuarioAtual();
      expect(onAuthStateChanged).toHaveBeenCalledTimes(1);
    });
  });
