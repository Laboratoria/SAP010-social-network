import { addDoc, collection } from 'firebase/firestore';

import { db } from 'firebase/auth';

import { criarPost } from '../src/lib/firestore';

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
