import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

import {
  loginGoogle,
  loginFacebook,
  createUserWithEmail,
  loginWithEmail,
  getUserId,
  getUserName,
  logOut,
  checkLoggedUser,
} from '../src/firebase/auth';

jest.mock('firebase/auth');
jest.mock('firebase/firestore');

const mockUserCredential = {
  user: {
    displayName: 'Maria',
    uid: 'uid9876',
  },
};

const mockUpdateUserProfile = {
  uid: 'uid9876',
  email: 'maria@example.com',
  displayName: 'Maria da Silva',
};

const authUser = {
  currentUser: {},
};

describe('loginGoogle', () => {
  it('should be a function', () => {
    expect(typeof loginGoogle).toBe('function');
  });

  it('should log in with Google Account', async () => {
    const authMock = getAuth();
    signInWithPopup.mockResolvedValueOnce(mockUserCredential);
    await loginGoogle();
    expect(signInWithPopup).toHaveBeenCalledTimes(1);
    expect(signInWithPopup).toHaveBeenCalledWith(authMock, expect.any(Object));
  });
});

afterEach(() => {
  signInWithPopup.mockClear();
});

describe('loginFacebook', () => {
  it('should be a function', () => {
    expect(typeof loginFacebook).toBe('function');
  });

  it('should log in with Facebook Account', async () => {
    const authMock = getAuth();
    signInWithPopup.mockResolvedValueOnce(mockUserCredential);
    await loginFacebook();
    expect(signInWithPopup).toHaveBeenCalledTimes(1);
    expect(signInWithPopup).toHaveBeenCalledWith(authMock, expect.any(Object));
  });
});

describe('createUserWithEmail', () => {
  it('should create a new user', async () => {
    const authMock = getAuth();
    createUserWithEmailAndPassword.mockResolvedValue(mockUserCredential);
    updateProfile.mockResolvedValue(mockUpdateUserProfile);
    const name = 'Social';
    const lastName = 'Network';
    const email = 'social@network.com';
    const password = 'social123';

    await createUserWithEmail(name, lastName, email, password);

    expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
      authMock,
      email,
      password,
    );
  });
});

describe('loginWithEmail', () => {
  it('should login with an email and password', async () => {
    const authMock = getAuth();
    signInWithEmailAndPassword.mockResolvedValue(authUser);
    const newEmail = 'network@socialcom';
    const newPassword = 'network123';
    await loginWithEmail(newEmail, newPassword);

    expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      authMock,
      newEmail,
      newPassword,
    );
  });
});

describe('getUserId', () => {
  it('should return the current user ID', () => {
    const userId = 'user123';
    const authMock = {
      currentUser: {
        uid: userId,
      },
    };
    getAuth.mockReturnValue(authMock);

    const result = getUserId();

    expect(result).toBe(userId);
  });
});

describe('getUserName', () => {
  it('should return the user name if the user is authenticated', () => {
    const displayName = 'Maria Silva';
    const authMock = {
      currentUser: {
        displayName,
      },
    };
    getAuth.mockReturnValue(authMock);

    const result = getUserName();

    expect(result).toBe(displayName);
  });

  it('should return "viajante" if the user is not authenticated', () => {
    const authMock = 'viajante';
    getAuth.mockReturnValue(authMock);

    const result = getUserName();

    expect(result).toBe('viajante');
  });
});

describe('logOut', () => {
  it('should log out the user', () => {
    const authMock = getAuth();
    signOut.mockResolvedValue({
      user: {},
    });
    logOut();
    expect(signOut).toHaveBeenCalledTimes(1);
    expect(signOut).toHaveBeenCalledWith(authMock);
  });
});

describe('checkLoggedUser', () => {
  it('should be a function', () => {
    expect(typeof checkLoggedUser).toBe('function');
  });

  it('should resolve to true if the user is logged in', async () => {
    const authMock = getAuth();
    const onAuthStateChangedMock = jest.fn((auth, callback) => {
      callback({ uid: 'user123' });
    });
    onAuthStateChanged.mockImplementation(onAuthStateChangedMock);

    const result = await checkLoggedUser();

    expect(result).toBe(true);
    expect(onAuthStateChangedMock).toHaveBeenCalledWith(
      authMock,
      expect.any(Function),
    );
  });

  it('should resolve to false if the user is not logged in', async () => {
    const authMock = getAuth();
    const onAuthStateChangedMock = jest.fn((auth, callback) => {
      callback(null);
    });
    onAuthStateChanged.mockImplementation(onAuthStateChangedMock);

    const result = await checkLoggedUser();

    expect(result).toBe(false);
    expect(onAuthStateChangedMock).toHaveBeenCalledWith(
      authMock,
      expect.any(Function),
    );
  });
});
