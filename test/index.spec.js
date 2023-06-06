// importamos la funcion que vamos a testear
import { validatePassword, validateEmail } from '../src/components.js/register.js';
import { loginCreate } from '../src/lib/index';

/* describe('myFunction', () => {
  it('debería ser una función', () => {
    expect(typeof myFunction).toBe('function');
  });
}); */

describe('Validações de e-mail e senha', () => {
  // validação de e-mail
  describe('validateEmail', () => {
    test('Deve retornar true para um e-mail válido', () => {
      const validEmail = 'test@example.com';
      expect(validateEmail(validEmail)).toBe(true);
    });

    test('Deve retornar false para um e-mail inválido', () => {
      const invalidEmail = 'invalid_email';
      expect(validateEmail(invalidEmail)).toBe(false);
    });
  });

  // validação de senha
  describe('validatePassword', () => {
    test('Deve retornar true para uma senha válida', () => {
      const validPassword = 'senha123';
      expect(validatePassword(validPassword)).toBe(true);
    });

    test('Deve retornar false para uma senha inválida', () => {
      const invalidPassword = 'senha';
      expect(validatePassword(invalidPassword)).toBe(false);
    });
  });
});
