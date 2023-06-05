import { isUserLoggedIn } from '../src/firebase/firebase.js';

jest.mock('../src/firebase/firebase.js', () => {
  const currentUser = {
    displayName: 'Spock',
    email: 'spoky@gmail.com',
    uid: '3141592',
  };
  return {
    isUserLoggedIn: async () => currentUser !== null,
  };
});

describe('isUserLoggedIn', () => {
  it('deve retornar true quando o usuário estiver logado', async () => {
    const result = await isUserLoggedIn();
    expect(result).toBe(true);
  });

  it('deve retornar false quando o usuário não estiver logado', async () => {
    jest.requireMock('../src/firebase/firebase.js').isUserLoggedIn = async () => false;
    const result = await isUserLoggedIn();
    expect(result).toBe(false);
  });
});
