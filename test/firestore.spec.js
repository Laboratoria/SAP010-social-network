import {
  addDoc,
  getDoc,
  doc,
  db,
  deleteDoc,
  updateDoc,
  onSnapshot,
  collection,
  orderBy,
} from 'firebase/firestore';

import {
  createPost,
  hasUserLikedPost,
  deletePost,
  updatePost,
  likePost,
  accessPost,
} from '../src/firebase/firestore';
import { getAppAuth } from '../src/firebase/auth';

jest.mock('firebase/firestore');
jest.mock('../src/firebase/auth');

const mockAppAuth = {
  currentUser: {
    displayName: 'Maria',
    uid: 'uid9876',
  },
};
getAppAuth.mockReturnValue(mockAppAuth);

describe('createPost', () => {
  it('should create a new post', async () => {
    addDoc.mockResolvedValue();
    const description = 'Ótima viagem.';
    const post = {
      name: mockAppAuth.currentUser.displayName,
      author: mockAppAuth.currentUser.uid,
      description,
      createdAt: new Date(),
      likes: [],
      whoLiked: [],
    };
    await createPost(description);
    expect(addDoc).toHaveBeenCalledTimes(1);
    expect(addDoc).toHaveBeenCalledWith(undefined, post);
  });
});

describe('deletePost', () => {
  it('should delete a post', async () => {
    deletePost();
    expect(deleteDoc).toHaveBeenCalledTimes(1);
  });
});

describe('updatePost', () => {
  it('should edit a post', async () => {
    updatePost();
    expect(updateDoc).toHaveBeenCalledTimes(1);
  });
});

describe('hasUserLikedPost', () => {
  it('deve retornar true se o usuário tiver curtido o post', async () => {
    const mockPostData = {
      whoLiked: ['uid9876'],
    };
    const mockGetDoc = {
      exists: true,
      data: jest.fn(() => mockPostData),
    };
    getDoc.mockReturnValueOnce(mockGetDoc);

    const postId = 'postId';
    const resultado = await hasUserLikedPost(postId);

    expect(getDoc).toHaveBeenCalledWith(doc(db, 'posts', postId));
    expect(resultado).toBe(true);
  });

  it('deve retornar false se o usuário não tiver curtido o post', async () => {
    const mockPostData = {
      whoLiked: ['userId'],
    };
    const mockGetDoc = jest.fn(() => ({
      exists: true,
      data: jest.fn(() => mockPostData),
    }));
    getDoc.mockReturnValueOnce(mockGetDoc);

    const postId = 'postId';
    const resultado = await hasUserLikedPost(postId);

    expect(getDoc).toHaveBeenCalledWith(doc(undefined, 'posts', postId));
    expect(resultado).toBe(false);
  });

  it('deve retornar false se o post não existir', async () => {
    const mockGetDoc = jest.fn(() => ({
      exists: false,
    }));
    getDoc.mockReturnValueOnce(mockGetDoc);

    const postId = 'postId';
    const resultado = await hasUserLikedPost(postId);

    expect(getDoc).toHaveBeenCalledWith(doc(undefined, 'posts', postId));
    expect(resultado).toBe(false);
  });
});

describe('likePost', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should remove like to post', async () => {
    const mockPostData = {
      whoLiked: ['userId'],
    };
    const userId = 'userId';
    const mockGetDoc = jest.fn(() => ({
      exists: true,
      data: jest.fn(() => mockPostData),
    }));
    getDoc.mockReturnValueOnce(mockGetDoc);

    const postId = 'postId';
    const result = await likePost(postId, userId);

    expect(getDoc).toHaveBeenCalledWith(doc(db, 'posts', postId));
    expect(result).toBe('remove like');
  });
  it('should add like to post', async () => {
    const mockPostData = {
      whoLiked: ['userId'],
    };
    const userId = 'userId';
    const mockGetDoc = {
      exists: true,
      data: jest.fn(() => mockPostData),
    };
    const postId = 'postId';
    const result = await likePost(postId, userId);
    getDoc.mockReturnValueOnce(mockGetDoc);
    expect(getDoc).toHaveBeenCalledWith(doc(db, 'posts', postId));
    expect(result).toBe('add like');
  });
});

describe('accessPost', () => {
  test('should update the post list', () => {
    const updateListPostMock = jest.fn();
    const mockSnapshot = {
      forEach: jest.fn((callback) => {
        const mockPost = { data: jest.fn(() => ({})), id: 'post-id' };
        callback(mockPost);
      }),
    };

    const mockCollection = jest.fn();
    const mockQuery = jest.fn();
    const mockOnSnapshot = jest.fn((postQuery, callback) => {
      callback(mockSnapshot);
    });
    collection.mockReturnValueOnce(mockCollection);
    orderBy.mockReturnValueOnce(mockQuery);
    onSnapshot.mockImplementationOnce(mockOnSnapshot);

    accessPost(updateListPostMock);

    expect(collection).toHaveBeenCalledWith(db, 'posts');
    expect(orderBy).toHaveBeenCalledWith('createdAt', 'desc');
    expect(mockSnapshot.forEach).toHaveBeenCalled();
    expect(updateListPostMock).toHaveBeenCalledWith([{ id: 'post-id' }]);
  });
});
