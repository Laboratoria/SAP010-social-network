import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { loginGoogle, loginWithEmail, getAppAuth } from '../src/configFirebase/auth';

jest.mock('firebase/auth');

describe('loginGoogle', () => {
  it('deverá ser uma função', () => {
    expect(typeof loginGoogle).toBe('function');
  });

  it('deveria fazer login com a conta do Google', async () => {
    signInWithPopup.mockResolvedValueOnce();
    await loginGoogle();
    expect(signInWithPopup).toHaveBeenCalledTimes(1);
  });
});

describe('loginWithEmail', () => {
  it('Devera logar com email e senha corretos', async () => {
    const email = 'teste@coffeestation.com';
    const password = '123456';

    signInWithEmailAndPassword.mockResolvedValueOnce({ user: { displayName: 'Test User' } });

    await loginWithEmail(email, password);
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(getAppAuth(), email, password);
  });

  it('Devera mostrar um erro e falhar ao logar o usuario errado', async () => {
    const email = 'teste@coffeestation.com';
    const password = '123456';

    signInWithEmailAndPassword.mockRejectedValueOnce('Erro ao logar usuário'));
    try {
      await loginWithEmail(email, password);
    } catch (error) {
      expect(error.message).toEqual('Erro ao logar usuário');
    }
  });
});
