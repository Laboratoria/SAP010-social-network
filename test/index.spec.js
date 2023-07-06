import {
  createUserWithEmailAndPassword,
  auth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  // getAuth,
  // updateProfile,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  doc,
  setDoc,
  deleteDoc,
  addDoc,
  collection,
  orderBy,
  query,
  onSnapshot,
} from 'firebase/firestore';
import {
  like,
  dislike,
  publish,
  getFeedItems,
  editItem,
  deletePost,
} from '../src/lib/firestore.js';
import {
  newUser,
  authLogin,
  authLoginGoogle,
  authStateChanged,
  logout,
} from '../src/lib/index.js';
import {
  db,
} from '../src/Firebase/instalfirebase.js';

const posts = [
  {
    id: 'post1',
    data: () => ({
      description: 'Restaurante muito bom',
      rating: 2,
      restaurantName: 'Oue',
      userAvatar: 'https://placekitten.com/50/50',
      userName: 'John Wicky',
      createdAt: '2023-07-02T12:33:43',
      userId: 'user1',
    }),
  },
];
const likes = [
  { id: 'like1', data: () => ({ postId: 'post1', userId: 'user1' }) },
];
const mockData = {
  [`${db}_Post`]: posts,
  [`${db}_PostLikes`]: likes,
};

jest.mock('firebase/auth');
jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
  deleteDoc: jest.fn(),
  setDoc: jest.fn(),
  addDoc: jest.fn(),
  orderBy: jest.fn(),
  query: jest.fn((dbCollection) => mockData[dbCollection]),
  onSnapshot: jest.fn((q, callback) => callback(q)),
  doc: jest.fn((database, collectionName, id) => `${database}_${collectionName}_${id}`),
  collection: jest.fn((database, collectionName) => `${database}_${collectionName}`),
}));

describe('Firebase', () => {
  test('login do usuário', async () => {
    const email = 'josédasilva@gmail.com';
    const senha = '123456';

    await authLogin(email, senha);

    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, email, senha);
  });

  test('Deveria logar o usuário com sua conta do Google', async () => {
    signInWithPopup.mockResolvedValueOnce();
    await authLoginGoogle();
    expect(GoogleAuthProvider).toHaveBeenCalledTimes(1);
  });

  test('Criar novo usuario', async () => {
    const email = 'josédasilva@gmail.com';
    const senha = '123456';

    await newUser(email, senha);
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(auth, email, senha);
  });

  test('Criar novo post', async () => {
    const collectionName = 'Post';
    const mockCollection = `${db}_${collectionName}`;
    const post = posts[0].data();

    await publish(post);

    expect(collection).toHaveBeenCalledWith(db, collectionName);
    expect(addDoc).toHaveBeenCalledWith(mockCollection, post);
  });

  test('deve chamar o callback corretamente', () => {
    const onAuthStateChangedMock = jest.fn();
    onAuthStateChanged.mockImplementation(onAuthStateChangedMock);
    authStateChanged(onAuthStateChangedMock);
    expect(onAuthStateChangedMock).toHaveBeenCalled();
  });

  test('Pega os itens e mostra na página', () => {
    const collectionName1 = 'Post';
    const collectionName2 = 'PostLikes';
    const mockCollection1 = `${db}_${collectionName1}`;
    const mockCollection2 = `${db}_${collectionName2}`;

    const renderItems = jest.fn((items) => items.map((item) => item.description));

    getFeedItems(renderItems);

    expect(renderItems).toHaveBeenCalledTimes(2);
    expect(collection).toHaveBeenCalledWith(db, collectionName1);
    expect(collection).toHaveBeenCalledWith(db, collectionName2);
    expect(query).toHaveBeenCalledWith(mockCollection1, orderBy());
    expect(query).toHaveBeenCalledWith(mockCollection2);
    expect(onSnapshot).toHaveBeenCalledTimes(2);
  });

  test('Dar like na postagem', async () => {
    const collectionName = 'PostLikes';
    const userId = 'user1';
    const postId = 'post1';
    const id = `${postId}_${userId}`;
    const mockDoc = `${db}_${collectionName}_${id}`;

    await like(postId, userId);

    expect(doc).toHaveBeenCalledWith(db, collectionName, id);
    expect(setDoc).toHaveBeenCalledWith(mockDoc, { postId, userId });
  });

  test('Dar dislike na postagem', async () => {
    const collectionName = 'PostLikes';
    const userId = 'user1';
    const postId = 'post1';
    const id = `${postId}_${userId}`;
    const mockDoc = `${db}_${collectionName}_${id}`;

    await dislike(postId, userId);

    expect(doc).toHaveBeenCalledWith(db, collectionName, id);
    expect(deleteDoc).toHaveBeenCalledWith(mockDoc);
  });

  test('logout do usuário', async () => {
    signOut.mockResolvedValue({
      user: {},
    });

    await logout();

    expect(signOut).toHaveBeenCalledTimes(1);
  });

  test('Deletar post do usuário', async () => {
    const postId = 'exemplo-id';
    deleteDoc.mockResolvedValue();
    await deletePost(postId);
    expect(doc).toHaveBeenCalledWith(db, 'Post', postId);
    expect(deleteDoc).toHaveBeenCalledWith(doc(db, 'Post', postId));
  });

  test('deve atualizar o post existente após edição', async () => {
    // const collectionName = 'PostLikes';
    const id = 'post1';
    const post = {
      description: 'Restaurante muito bom',
      restaurantName: 'Oue',
    };
    const refDoc = `${db}_Post_${id}`;
    await editItem(id, post);
    expect(doc).toHaveBeenCalledWith(db, 'Post', id);
    expect(setDoc).toHaveBeenCalledWith(refDoc, post);
  });
});
