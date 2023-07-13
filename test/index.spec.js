import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';

import { createUser } from '../src/pages/serviceFirebase/firebaseAuth.js';

jest.mock('firebase/auth');

const mockUser = {
  user: {
    nome: 'Camila',
    email: 'test@example.com',
    senha: '123456',
  },
};

describe('createUser is a function', () => {
  it('É uma função', () => {
    expect(typeof createUser).toBe('function');
  });
  it('Criou um novo usuário', async () => {
    const authMock = getAuth();
    createUserWithEmailAndPassword.mockResolvedValue(mockUser);
    const nome = 'Camila';
    const email = 'test@example.com';
    const senha = '123456';
    await createUser(nome, email, senha);

    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(authMock, email, senha);
  });
});
