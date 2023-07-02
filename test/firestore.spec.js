import {
  addDoc,
  collection,
  getDocs,
  getDoc,
  doc,
  deleteDoc,
  updateDoc,
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
  editPostDoc,
  addLike,
  getUsername,
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

describe('getUsername', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar o nome de usuário quando o usuário atual existe e usa o provedor do Google', async () => {
    const currentUser = {
      providerData: [{ providerId: 'google.com' }],
      displayName: 'Maria da Silva',
    };

    const username = await getUsername(currentUser, 'userId');

    expect(username).toBe('Maria da Silva');
  });

  it('deve retornar o nome de usuário do primeiro documento da consulta quando o usuário atual não usa o provedor do Google', async () => {
    const currentUser = {
      providerData: [{ providerId: 'facebook.com' }],
    };

    const mockQuerySnapshot = {
      empty: false,
      docs: [{ data: () => ({ name: 'Alice' }) }],
    };

    getDocs.mockResolvedValueOnce(mockQuerySnapshot);

    const username = await getUsername(currentUser, 'userId');

    expect(username).toBe('Alice');
  });
});

describe('checkAuthor', () => {
  it('deve checar se o usuário logado é o autor das suas postagens', async () => {
    const mockPostId = 'postA';
    const mockCurrentUserId = 'UserABC';

    const mockDocSnapshot = {
      exists: jest.fn().mockReturnValue(true),
      data: jest.fn().mockReturnValue({ postAuthorId: mockCurrentUserId }),
    };
    getDoc.mockResolvedValue(mockDocSnapshot);

    const resultado = await checkAuthor(mockPostId, mockCurrentUserId);

    expect(getDoc).toHaveBeenCalledWith(doc(db, 'post', mockPostId));
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

describe('editPostDoc', () => {
  it('deve atualizar os dados de um post', async () => {
    // Mock dos parâmetros
    const postId = 'id-post';
    const racaEdit = 'Nova Raça';
    const mensagemEdit = 'Nova Mensagem';
    const localizacaoEdit = 'Nova Localização';
    const idadeEdit = 'Nova Idade';
    const sexoEdit = 'Novo Sexo';
    const especieEdit = 'Nova Espécie';
    const opcaoAdocaoEdit = 'Nova Opção de Adoção';
    const contatoEdit = 'Novo Contato';

    // Mock do documento de post
    const mockPostRef = 'mock-post-ref';
    doc.mockReturnValueOnce(mockPostRef);

    // Chama a função editPostDoc com os parâmetros mockados
    await editPostDoc(
      postId,
      racaEdit,
      mensagemEdit,
      localizacaoEdit,
      idadeEdit,
      sexoEdit,
      especieEdit,
      opcaoAdocaoEdit,
      contatoEdit,
    );

    // Verifica se a função doc foi chamada com os parâmetros corretos
    expect(doc).toHaveBeenCalledTimes(1);
    expect(doc).toHaveBeenCalledWith(db, 'post', postId);

    // Verifica se a função updateDoc foi chamada com o documento
    expect(updateDoc).toHaveBeenCalledTimes(1);
    expect(updateDoc).toHaveBeenCalledWith(mockPostRef, {
      raca: racaEdit,
      mensagem: mensagemEdit,
      localizacao: localizacaoEdit,
      idadePet: idadeEdit,
      especie: especieEdit,
      opcaoAdocao: opcaoAdocaoEdit,
      contato: contatoEdit,
      sexo: sexoEdit,
    });
  });
});

describe('addLike', () => {
  it('deve adicionar ou remover um like em um post existente', async () => {
    // Mock do ID do post e do novo like
    const postId = 'id-post';
    const newLike = 'usuário1';

    // Mock do snapshot do post existente com likes
    const mockPostSnapshot = {
      exists: true,
      data: () => ({
        postLikes: ['usuário2', 'usuário3', 'usuário1'],
      }),
    };
    getDoc.mockResolvedValueOnce(mockPostSnapshot);

    // Chama a função addLike passando o ID do post e o novo like
    await addLike(postId, newLike);

    // Verifica se a função getDoc foi chamada com os parâmetros corretos
    expect(getDoc).toHaveBeenCalledTimes(1);
    expect(getDoc).toHaveBeenCalledWith(doc(db, 'post', postId));

    // Verifica se a função updateDoc foi cham c/ doc mockado e o novo estado dos likes corretos
    expect(updateDoc).toHaveBeenCalledTimes(1);
    expect(updateDoc).toHaveBeenCalledWith(doc(db, 'post', postId), {
      postLikes: ['usuário2', 'usuário3'],
    });
  });

  it('não deve modificar os likes em um post inexistente', async () => {
    // Mock do ID do post inexistente
    const postId = 'id-post-inexistente';
    const newLike = 'usuário1';

    // Mock do snapshot do post inexistente
    const mockPostSnapshot = {
      exists: false,
    };
    getDoc.mockResolvedValueOnce(mockPostSnapshot);

    // Chama a função addLike passando o ID do post inexistente e o novo like
    await addLike(postId, newLike);

    // Verifica se a função getDoc foi chamada com os parâmetros corretos
    expect(getDoc).toHaveBeenCalledTimes(1);
    expect(getDoc).toHaveBeenCalledWith(doc(db, 'post', postId));

    // Verifica se a função updateDoc não foi chamada
    expect(updateDoc).not.toHaveBeenCalled();
  });
});
