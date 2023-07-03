import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  arrayUnion,
  arrayRemove,
  deleteDoc,
} from 'firebase/firestore';

import {
  createPost,
  fetchPosts,
  likeCounter,
  deslikeCounter,
  deletePost,
  editPost,
} from '../../src/fireBase/firebaseStore.js';

import { db } from '../../src/fireBase/firebaseConfig';

jest.mock('firebase/firestore');

beforeEach(() => {
  jest.resetAllMocks();
});

const post1 = {
  date: 1,
  username: 'usuário1',
  text: '1 - mensagem escrita no input',
  uid: 111111,
};

const post2 = {
  date: 2,
  username: 'usuário2',
  text: '2 - mensagem escrita no input',
  uid: 222222,
};

const post3 = {
  date: 3,
  username: 'usuário3',
  text: '3 - mensagem escrita no input',
  uid: 333333,
};

const posts = [post3, post2, post1];

it('Esperado o retorno de um array de posts ordenados por data e hora decrescente', async () => {
  const docs = [
    { data: () => post2 },
    { data: () => post1 },
    { data: () => post3 },
  ];
  const postsCollection = { docs };
  collection.mockReturnValueOnce(postsCollection);
  getDocs.mockResolvedValueOnce(docs);

  const result = await fetchPosts();

  expect(typeof fetchPosts).toBe('function');
  expect(collection).toHaveBeenCalledTimes(1);
  expect(collection).toHaveBeenCalledWith(undefined, 'posts');
  expect(getDocs).toHaveBeenCalledTimes(1);
  expect(getDocs).toHaveBeenCalledWith(postsCollection);
  expect(result).toEqual(posts);
});

const postTestLike = {
  id: 111,
  likes: ['usuário2', 'usuário1', 'usuário3'],
};

const userTestDeslike = 'usuário1';

it('Esperado que o usuário seja removido do array de likes', async () => {
  const documentReference = {};
  const updatedDeslikes = ['usuário2', 'usuário3'];

  updateDoc.mockResolvedValueOnce();
  arrayRemove.mockReturnValueOnce(updatedDeslikes);
  doc.mockReturnValueOnce(documentReference);

  await deslikeCounter(postTestLike.id, userTestDeslike);

  expect(typeof deslikeCounter).toBe('function');
  expect(doc).toHaveBeenCalledTimes(1);
  expect(doc).toHaveBeenCalledWith(undefined, 'posts', postTestLike.id);
  expect(arrayRemove).toHaveBeenCalledTimes(1);
  expect(arrayRemove).toHaveBeenCalledWith(userTestDeslike);
  expect(updateDoc).toHaveBeenCalledTimes(1);
  expect(updateDoc).toHaveBeenCalledWith(documentReference, {
    likes: updatedDeslikes,
  });
});

const userTestlike = 'usuário4';

it('Esperado que o usuário seja adicionado no array de likes', async () => {
  const documentReference = {};
  const updatedLikes = ['usuário1', 'usuário2', 'usuário3', 'usuário4'];

  updateDoc.mockResolvedValueOnce();
  arrayUnion.mockReturnValueOnce(updatedLikes);
  doc.mockReturnValueOnce(documentReference);

  await likeCounter(postTestLike.id, userTestlike);

  expect(typeof likeCounter).toBe('function');
  expect(doc).toHaveBeenCalledTimes(1);
  expect(doc).toHaveBeenCalledWith(undefined, 'posts', postTestLike.id);
  expect(arrayUnion).toHaveBeenCalledTimes(1);
  expect(arrayUnion).toHaveBeenCalledWith(userTestlike);
  expect(updateDoc).toHaveBeenCalledTimes(1);
  expect(updateDoc).toHaveBeenCalledWith(documentReference, {
    likes: updatedLikes,
  });
});

// Testando a função deleteDoc do Firestore
describe('deletePost', () => {
  it('Deveria excluir a postagem com o ID fornecido', async () => {
    const postId = 'post1';

    // Chamar a função deletePost com o ID da postagem
    await deletePost(postId);

    // Verificar se a função deleteDoc foi chamada corretamente
    expect(deleteDoc).toHaveBeenCalledWith(doc(db, 'posts', postId));
  });
});

// Testando função de apagar post pagina Feed
describe('deletePost', () => {
  let postElement;
  let buttonDelete;
  let feedElement;

  beforeEach(() => {
    // Configurar elementos simulados antes de cada teste
    postElement = document.createElement('div');
    postElement.id = 'post1';

    buttonDelete = document.createElement('button');
    buttonDelete.id = 'button-delete';

    feedElement = document.createElement('div');
    feedElement.id = 'feed';
    feedElement.appendChild(postElement);
    feedElement.appendChild(buttonDelete);
  });

  it('Deveria excluir a postagem e remover o elemento do feed', async () => {
    // Simular o clique no botão de exclusão
    buttonDelete.click();

    // Verificar se a função deletePost foi chamada com o ID correto
    expect(deletePost).toHaveBeenCalledWith('post1');

    // Verificar se o elemento da postagem foi removido do feed
    expect(feedElement.contains(postElement)).toBe(false);
  });
});

// Testando função de editar do firebase store
describe('editPost', () => {
  it('Deveria editar a postagem com o novo texto fornecido', async () => {
    const postId = 'post1';
    const newText = 'Novo texto';

    // Simular a função updateDoc do Firestore
    const updateDoc = jest.fn();

    // Chamar a função editPost com o ID da postagem e o novo texto
    await editPost(postId, newText);

    // Verificar se a função updateDoc foi chamada corretamente
    expect(updateDoc).toHaveBeenCalledWith(doc(db, 'posts', postId), {
      text: newText,
    });
  });
});

// Testando função de editar post pagina Feed
describe('editPost', () => {
  let postElement;
  let buttonEdit;
  let mockPromptInput;

  beforeEach(() => {
    // Configurar elementos simulados antes de cada teste
    postElement = document.createElement('div');
    postElement.setAttribute('data-post-id', 'post1');

    buttonEdit = document.createElement('button');
    buttonEdit.classList.add('button-edit');

    mockPromptInput = 'Novo texto';

    // Simular a função 'prompt' para retornar o novo texto
    window.prompt = jest.fn().mockReturnValue(mockPromptInput);

    postElement.appendChild(buttonEdit);
  });

  it('Deveria editar a postagem com o novo texto fornecido', async () => {
    // Simular o clique no botão de edição
    buttonEdit.click();

    // Verificar se a função prompt foi chamada
    expect(window.prompt).toHaveBeenCalledWith('Digite o novo texto:');

    // Verificar se a função editPost foi chamada com o ID correto e o novo texto
    expect(editPost).toHaveBeenCalledWith('post1', mockPromptInput);

    // Verificar se o texto da postagem foi atualizado corretamente
    const textElement = postElement.querySelector('.text');
    expect(textElement.textContent).toBe(mockPromptInput);
  });
});

// Testando a função de criar post do firebase store
describe('createPost', () => {
  it('Deveria criar uma nova postagem com os dados fornecidos', async () => {
    const date = new Date();
    const username = 'john.doe';
    const text = 'Nova postagem';
    const uid = 'user123';

    // Chamar a função createPost com os dados da nova postagem
    await createPost(date, username, text, uid);

    // Verificar se a função addDoc foi chamada corretamente
    expect(addDoc).toHaveBeenCalledWith(collection(db, 'posts'), {
      date,
      username,
      likes: [],
      text,
      uid,
    });
  });
});

// Testando a função criar post da pagina feed
describe('createPostElement', () => {
  let post;
  let feedElement;

  beforeEach(() => {
    // Configurar as variáveis necessárias antes de cada teste
    post = {
      id: 'post1',
      date: {
        seconds: 1625168400,
        nanoseconds: 0,
      },
      username: 'john.doe',
      text: 'Exemplo de postagem',
      likes: [],
      uid: 'user123',
    };

    feedElement = document.createElement('div');
  });

  it('Deveria criar corretamente o elemento de postagem com os dados fornecidos', () => {
    // Chamar a função createPostElement com os dados da postagem
    const postElement = createPost(post, feedElement);

    // Verificar se o elemento foi criado corretamente
    expect(postElement.getAttribute('data-post-id')).toBe(post.id);
    expect(postElement.classList.contains('post')).toBe(true);

    // Verificar se as informações do post foram renderizadas corretamente
    const nameElement = postElement.querySelector('.name');
    const dateElement = postElement.querySelector('.date');
    const textElement = postElement.querySelector('.text');

    expect(nameElement.textContent).toBe(post.username);

    // Verificar se a data foi formatada corretamente
    const expectedDate = '01/07/2021 00:00';
    expect(dateElement.textContent).toBe(expectedDate);

    expect(textElement.textContent).toBe(post.text);

    // Verificar se os botões de edição e exclusão foram renderizados corretamente
    const btnEditElement = postElement.querySelector('.button-edit');
    const btnDeleteElement = postElement.querySelector('.button-delete');

    // Verificar se os botões foram renderizados corretamente com base no UID do usuário
    if (post.uid === auth.currentUser.uid) {
      expect(btnEditElement).toBeDefined();
      expect(btnDeleteElement).toBeDefined();
    } else {
      expect(btnEditElement).toBeNull();
      expect(btnDeleteElement).toBeNull();
    }
  });
});
