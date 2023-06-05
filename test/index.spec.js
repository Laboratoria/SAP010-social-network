import { isUserLoggedIn } from '../src/firebase/firebase.js';

// mockar essa bagaça

jest.mock('firebase/auth', () => ({
  getAuth: () => ({
    currentUser: {
      displayName: 'Spock',
      email: 'spoky@gmail.com',
      uid: '3141592',
    },
  }),
}));

describe('isUserLoggedIn', () => {
  it('deve retornar true quando o usuário estiver logado', async () => {
    const result = await isUserLoggedIn();
    expect(result).toBe(true);
  });

  it('deve retornar false quando o usuário não estiver logado', async () => {
    jest.requireMock('firebase/auth').getAuth = () => ({
      currentUser: null,
    });
    const result = await isUserLoggedIn();
    expect(result).toBe(false);
  });
});
