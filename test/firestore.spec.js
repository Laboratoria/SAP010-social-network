import { addDoc } from 'firebase/firestore';
import { createPost } from '../src/firebase/firestore';
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

// afterEach(() => {
//   jest.clearAllMocks();
// });

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
