import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';


//Essas funções são assíncronas, ou seja, que não depende de finalização para seguir com o restante do código
//no teste colocamos await para que o teste só siga em frente depois de terminar de executar a função async
import {
  createUser,
  signIn,
  signInGoogle,
  logOut
} from '../../src/fireBase/firebaseAuth.js'

//Informando para o jest qual biblioteca que vai ser mascarada os comportamentos
jest.mock('firebase/auth');

// função do jest para não rodar os testes em paralelo, ou seja, não rodar tudo de uma vez.
// para um teste não interferir no outro.
beforeEach(() => {
  jest.resetAllMocks();
});

const email = 'test@email.com';
const password = 'password';
const name = 'Name';
const lastName = 'LastName';
const username = 'username';

const invalidEmail = 'test.email.com';
const invalidPassword = '123';

const provider = new GoogleAuthProvider();

//teste case para função createUser
//tradução: "Espera-se criar um novo usuário e atualizar seu perfil"
it('Expected to create a new user and update its profile', async () => {
  const userCredential = {
    user: {}
  };
  // Aqui nós só estamos descrevendo o que a função do firabase retorna.
  // mockResolvedValueOnce - é um método específico do Jest que pode ser usado para definir o comportamento de uma função mock, 
  // -especificando o valor de retorno esperado quando essa função é chamada.
  createUserWithEmailAndPassword.mockResolvedValueOnce(userCredential);
  updateProfile.mockResolvedValueOnce();

  await createUser(email, password, name, lastName, username);
  //Validações - Depois de terminar de executar vai validar o que aconteceu.
  expect(typeof createUser).toBe('function');
  expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
  expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(undefined, email, password);
  expect(updateProfile).toHaveBeenCalledTimes(1);
  expect(updateProfile).toHaveBeenCalledWith(userCredential.user, { name, lastName, username });
});

it('Expected creat user invalid e-mail', async () => {
  createUserWithEmailAndPassword.mockRejectedValueOnce(new Error('Invalid email'));

  await expect(createUser(invalidEmail, password)).rejects.toThrow('Invalid email');

  expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
  expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(undefined, invalidEmail, password);
  expect(updateProfile).not.toHaveBeenCalled();
});

it('Expected sign in invalid password', async () => {
  createUserWithEmailAndPassword.mockRejectedValueOnce(new Error('Invalid password'));

  await expect(createUser(email, invalidPassword)).rejects.toThrow('Invalid password');

  expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
  expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(undefined, email, invalidPassword);
  expect(updateProfile).not.toHaveBeenCalled();
});

//teste case para função signIn
// tradução: Espera-se logar
it('Expected to sign in', async () => {
  signInWithEmailAndPassword.mockResolvedValueOnce();

  await signIn(email, password);

  expect(typeof signIn).toBe('function');
  expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
  expect(signInWithEmailAndPassword).toHaveBeenCalledWith(undefined, email, password);
});

it('Expected sign in invalid e-mail', async () => {
  signInWithEmailAndPassword.mockRejectedValueOnce(new Error('Invalid email'));

  await expect(signIn(invalidEmail, password)).rejects.toThrow('Invalid email');

  expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
  expect(signInWithEmailAndPassword).toHaveBeenCalledWith(undefined, invalidEmail, password);
});

it('Expected sign in invalid password', async () => {
  signInWithEmailAndPassword.mockRejectedValueOnce(new Error('Invalid password'));

  await expect(signIn(email, invalidPassword)).rejects.toThrow('Invalid password');

  expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
  expect(signInWithEmailAndPassword).toHaveBeenCalledWith(undefined, email, invalidPassword);
});

//teste case para função signInGoogle
//Espera-se logar com a conta Google
it('Expected to sign in with Google account', async () => {
  // essas funções () não retorna nenhum objeto só sucesso ou erro.
  signInWithPopup.mockResolvedValueOnce();

  await signInGoogle();

  expect(typeof signInGoogle).toBe('function');
  expect(signInWithPopup).toHaveBeenCalledTimes(1);
  expect(signInWithPopup).toHaveBeenCalledWith(undefined, provider);
});

//teste case para função logOut
describe('logOut', () => {
  it('Deveria deslogar', async () => {
    await logOut();
    expect(signOut).toHaveBeenCalled();
  });
});


