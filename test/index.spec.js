// importamos la funcion que vamos a testear
// import { myFunction } from '../src/lib/index';

// describe('myFunction', () => {
//   it('debería ser una función', () => {
//     expect(typeof myFunction).toBe('function');
//   });
// });
import {
  cadastrarUsuario,
  atualizarNomeDoUsuario,
  loginUsuario,
  sairDaConta,
  redefinirSenha,
} from '../src/lib/firebase';

describe(cadastrarUsuario, () => {
  it('deve ser uma função', () => {
    expect(typeof cadastrarUsuario).toBe('function');
  });
});

describe(atualizarNomeDoUsuario, () => {
  it('deve ser uma função', () => {
    expect(typeof atualizarNomeDoUsuario).toBe('function');
  });
});

describe(loginUsuario, () => {
  it('deve ser uma função', () => {
    expect(typeof loginUsuario).toBe('function');
  });
});

describe(sairDaConta, () => {
  it('deve ser uma função', () => {
    expect(typeof sairDaConta).toBe('function');
  });
});

describe(redefinirSenha, () => {
  it('deve ser uma função', () => {
    expect(typeof redefinirSenha).toBe('function');
  });
});
