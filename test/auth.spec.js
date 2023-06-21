import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import {
  loginGoogle,
  loginFacebook,
  createUserWithEmail,
  loginWithEmail,
  getUserId,
  getUserName,
} from '../src/firebase/auth';

jest.mock('firebase/auth');

describe('loginGoogle', () => {
  it('expect to be a function', () => {
    expect(typeof loginGoogle).toBe('function');
  });

  it('should log in with Google Account', async () => {
    signInWithPopup.mockResolvedValueOnce();
    await loginGoogle();
    expect(signInWithPopup).toHaveBeenCalledTimes(1);
  });
});

afterEach(() => {
  signInWithPopup.mockClear();
});

describe('loginFacebook', () => {
  it('expect to be a function', () => {
    expect(typeof loginFacebook).toBe('function');
  });

  it('should log in with Facebook Account', async () => {
    signInWithPopup.mockResolvedValueOnce();
    await loginFacebook();
    expect(signInWithPopup).toHaveBeenCalledTimes(1);
  });
});

const auth = {
  currentUser: {},
};
getAuth.mockReturnValue(auth);

describe('createUserWithEmail', () => {
  it('should create a new user', async () => {
    createUserWithEmailAndPassword.mockResolvedValue(auth);
    const name = 'Social';
    const lastName = 'Network';
    const email = 'social@network.com';
    const password = 'social123';

    await createUserWithEmail(name, lastName, email, password);

    expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
      auth,
      email,
      password,
    );
  });
});

describe('loginWithEmail', () => {
  it('should login with an email and password', async () => {
    signInWithEmailAndPassword.mockResolvedValue(auth);
    const newEmail = 'network@socialcom';
    const newPassword = 'network123';
    await loginWithEmail(newEmail, newPassword);

    expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      auth,
      newEmail,
      newPassword,
    );
  });
});

describe('getUserId', () => {
  it('should return the current user ID', async () => {
    const userId = 'user123';
    const authTest = {
      currentUser: {
        uid: userId,
      },
    };
    getAuth.mockReturnValue(authTest);

    const result = getUserId();

    expect(result).toBe(userId);
  });
});

describe('getUserName', () => {
  it('Return the user name if user is authenticated', () => {
    const authUser = {
      currentUser: {
        displayName: 'Maria Silva',
      },
    };
    getAuth.mockReturnValue(authUser);

    const result = getUserName();

    expect(result).toBe('Maria Silva');
  });

  it('return viajante if user is not authenticated', () => {
    const authUser = 'viajante';
    getAuth.mockReturnValue(authUser);

    const result = getUserName();

    expect(result).toBe('viajante');
  });
});
