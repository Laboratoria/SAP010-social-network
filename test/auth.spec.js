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
} from '../src/firebase/auth';

jest.mock('firebase/auth');

describe('loginGoogle', () => {
  it('expect to be a function', () => {
    expect(typeof loginGoogle).toBe('function');
  });

  it('Should log in with Google Account', async () => {
    signInWithPopup.mockResolvedValueOnce();
    await loginGoogle();
    expect(signInWithPopup).toHaveBeenCalledTimes(1);
  });
});

describe('loginFacebook', () => {
  it('expect to be a function', () => {
    expect(typeof loginGoogle).toBe('function');
  });

  it('Should log in with Facebook Account', async () => {
    signInWithPopup.mockResolvedValueOnce();
    await loginFacebook();
    expect(signInWithPopup).toHaveBeenCalledTimes(2);
  });
});

const auth = {
  currentUser: {},
};
getAuth.mockReturnValue(auth);

describe('createUserWithEmail', () => {
  it('should create a new user', async () => {
    createUserWithEmailAndPassword.mockResolvedValue(auth);

    const email = 'social@network.com';
    const password = 'social123';
    const name = 'Network';
    await createUserWithEmail(name, email, password);

    expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(auth, email, password);
  });
});

describe('loginWithEmail', () => {
  it('should login with an email and password', async () => {
    signInWithEmailAndPassword.mockResolvedValue(auth);
    const newEmail = 'network@socialcom';
    const newPassword = 'network123';
    await loginWithEmail(newEmail, newPassword);

    expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, newEmail, newPassword);
  });
});
