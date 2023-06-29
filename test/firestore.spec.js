import { addDoc, collection, getDocs, doc, } from 'firebase/firestore';

import { db, onAuthStateChanged } from 'firebase/auth';

import {
  criarPost,
  carregarPosts,
  createUserData,
  getCurrentUserId,
  getCurrentUser,
  getUsername,
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
    await expect(getCurrentUserId()).rejects.toThrow(
      'Usuário não autnticado.'
    );
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

  /*  it('Deve retornar o nome de usuário do documento encontrado', async () => {
    const
  })  */
});

