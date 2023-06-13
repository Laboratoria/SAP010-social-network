// importamos la funcion que vamos a testear
import { signIn } from '../src/lib/index.js';

describe('signIn', () => {
  it('deve ser uma função', () => {
    expect(typeof signIn).toBe('function');
  });
});

