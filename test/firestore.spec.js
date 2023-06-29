import {
  addDoc,
  collection,
  getDocs,
  doc,
  deleteDoc,
} from 'firebase/firestore';

import { db } from 'firebase/auth';

import {
  criarPost,
  carregarPosts,
  createUserData,
  deletePost,
} from '../src/lib/firestore';

jest.mock('firebase/firestore');
jest.mock('firebase/auth');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('criarPost', () => {
  const dadosPost = {
    idadePet: 'filhote',
    especie: 'Cachorro',
    sexo: 'Fêmea',
    raca: 'Labrador Retriever',
    localizacao: 'São Paulo',
    contato: '999999999999',
    mensagem: 'Este é um cão adorável em busca de um lar!',
  };

  it('deve criar um post', async () => {
    const docRef = { id: 'document_id' };
    addDoc.mockResolvedValueOnce(docRef);

    await criarPost(dadosPost);

    expect(addDoc).toHaveBeenCalledTimes(1);
    expect(addDoc).toHaveBeenCalledWith(collection(db, 'post'), dadosPost);
  });
});

describe('carregarPosts', () => {
  it('deve carregar os posts', async () => {
    await carregarPosts();
    expect(getDocs).toHaveBeenCalledTimes(1);
  });
});

describe('createUserData', () => {
  it('deve criar os dados dos usuários', async () => {
    const mockUser = { uid: 'id' };
    const mockNome = 'nome';

    db.mockReturnValueOnce({ currentUser: mockUser });

    await createUserData(mockNome);

    expect(addDoc).toHaveBeenCalledTimes(1);
    expect(addDoc).toHaveBeenCalledWith(collection(db, 'usernames'), {
      name: mockNome,
      userId: mockUser.uid,
    });
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
