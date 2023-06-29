import {
  addDoc,
  collection,
  getDocs,
  getDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';

import { db, onAuthStateChanged } from 'firebase/auth';

import { expect } from '@jest/globals';

import {
  criarPost,
  carregarPosts,
  createUserData,
  getCurrentUserId,
  getCurrentUser,
  checkAuthor,
  deletePost,
} from '../src/lib/firestore';

jest.mock('firebase/firestore');
jest.mock('firebase/auth');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('criarPost', () => {
  const mockPost = {
    idadePet: 'filhote',
    especie: 'Cachorro',
    sexo: 'Fêmea',
    raca: 'Labrador Retriever',
    localizacao: 'São Paulo',
    contato: '999999999999',
    mensagem: 'Este é um cão adorável em busca de um lar!',
  };

  it('deve criar um post', async () => {
    await criarPost(mockPost);

    expect(collection).toHaveBeenCalledWith(db, 'post');
    expect(addDoc).toHaveBeenCalledWith(collection(), mockPost);
  });
});

describe('carregarPosts', () => {
  it('deve carregar os posts', async () => {
    const querySnapshotMock = {
      docs: [
        {
          id: 'postA',
          data: () => ({ titulo: 'Post A', conteudo: 'Quero adotar um Pet' }),
        },
      ],
    };

    getDocs.mockResolvedValueOnce(querySnapshotMock);

    const retornar = await carregarPosts();

    expect(getDocs).toHaveBeenCalledTimes(1);
    expect(retornar).toEqual([
      { id: 'postA', titulo: 'Post A', conteudo: 'Quero adotar um Pet' },
    ]);
  });
});

describe('createUserData', () => {
  it('deve criar os dados dos usuários quando passar pela autenticação', async () => {
    const mockUser = { uid: 'id' };
    const mockNome = 'nome';
    onAuthStateChanged.mockImplementationOnce((auth, callback) => callback(mockUser));

    await createUserData(mockNome);

    expect(collection).toHaveBeenCalledWith(db, 'usernames');
    expect(addDoc).toHaveBeenCalledWith(collection(), {
      name: mockNome,
      userId: mockUser.uid,
    });
  });
});

describe('getCurrentUserId', () => {
  it('Deve retornar o Id do usuário conectado', async () => {
    const mockUser = { uid: '123' };

    onAuthStateChanged.mockImplementation((auth, callback) => {
      callback(mockUser);
    });

    const userId = await getCurrentUserId();
    expect(userId).toBe('123');
  });

  it('Deve retornar erro se o usuário não estiver autenticado', async () => {
    onAuthStateChanged.mockImplementation((auth, callback) => {
      callback(null);
    });
    await expect(getCurrentUserId()).rejects.toThrow('Usuário não autenticado.');
  });
});

describe('getCurrentUser', () => {
  it('Deve retornar o Id do usuário conectado', async () => {
    const mockUser = { uid: '123' };

    onAuthStateChanged.mockImplementation((auth, callback) => {
      callback(mockUser);
    });

    const currentUser = await getCurrentUser();
    expect(currentUser).toBe(mockUser);
  });

  it('Deve retornar erro se o usuário não estiver autenticado', async () => {
    onAuthStateChanged.mockImplementation((auth, callback) => {
      callback(null);
    });
    await expect(getCurrentUser()).rejects.toThrow('Usuário não autenticado.');
  });
});

/* describe('getUsername', () => {
  it('Deve retornar o nome do usuário do provedor "google.com" do usuário', async () => {
    const mockCurrentUser = {
      displayName: 'Maria da Silva',
      providerData: [{ providerId: 'google.com' }],
    };
    getCurrentUser.mockResolvedValue(mockCurrentUser);

    const username = await getUsername();

    expect(username).toBe('Maria da Silva');
    expect(getCurrentUserId).not.toHaveBeenCalled();
  });

   it('Deve retornar o nome de usuário do documento encontrado', async () => {
    const
  })
}); */

describe('checkAuthor', () => {
  it('deve checar se o usuário logado é o autor das suas postagens', async () => {
    const mockPostId = 'postA';
    const mockCurrentUserId = 'userABC';

    const mockAuth = {
      getCurrentUserId: jest.fn().mockResolvedValue(mockCurrentUserId),
    };

    const mockDocSnapshot = {
      exists: true,
      data: jest.fn(),
    };
    getDoc.mockResolvedValue(mockDocSnapshot);

    const resultado = await checkAuthor(mockPostId, mockAuth);

    expect(getDoc).toHaveBeenCalledWith(doc(db, 'post', mockPostId));
    expect(mockAuth.getCurrentUserId).toHaveBeenCalledTimes(1);
    expect(resultado).toBe(true);
  });
});

describe('deletePost', () => {
  it('deve deletar uma publicação', async () => {
    // Mock do ID da postagem
    const postId = 'id-post';

    // Mock do retorno da função doc
    const mockDoc = 'mock-doc';
    doc.mockReturnValueOnce(mockDoc);

    // Chama a função deletePost passando o ID mockado
    await deletePost(postId);

    // Verifica se a função doc foi chamada com os parâmetros corretos
    expect(doc).toHaveBeenCalledTimes(1);
    expect(doc).toHaveBeenCalledWith(db, 'post', postId);

    // Verifica se a função deleteDoc foi chamada com o documento mockado
    expect(deleteDoc).toHaveBeenCalledTimes(1);
    expect(deleteDoc).toHaveBeenCalledWith(mockDoc);
  });
});
