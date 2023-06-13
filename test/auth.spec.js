import { signInWithPopup } from 'firebase/auth';

import { loginGoogle } from '../src/firebase/auth';

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
