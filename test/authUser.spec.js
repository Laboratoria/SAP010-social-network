import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,  
  auth,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { loginEmail,cadastroUsuarioSenha, loginGoogle, getUserId, userLogout, userAuthCheck, getUserName} from '../src/lib/authUser';
import { app } from '../src/lib/configfirebase';

jest.mock('../src/lib/configfirebase');
jest.mock('firebase/auth');

describe('login', () => {
  it('deverá fazer o login com email e senha correta', async () => {
    const email = 'nome@algo.com';
    const senha = 'jdhjfg5246';
    await loginEmail(email, senha);// verifica a ação do usuário
    expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth,email, senha);// verifica o direcionamento esperado
  });
});

describe('usuário e senha', () => {
  it('deverá mostrar msg de erro quando email e senha estiverem incorretos', async () => {
    const usuario = 'qualquer'
    const email = 'nome@algo.com';
    const senha = 'jdhjfg5246';
    const dados = {user: usuario};
    createUserWithEmailAndPassword.mockResolvedValue(dados);
    await cadastroUsuarioSenha(email, senha);// verifica a ação do usuário
    expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(auth ,email, senha);// verifica o direcionamento esperado
  });
});

describe('login com o Google', () => {
  it('deve chamar signInWithPopup com o provedor correto', async () => {    
    const provider = new GoogleAuthProvider();
    const auth = getAuth(); // Importar getAuth do Firebase e inicializar a instância do Auth
    signInWithPopup.mockResolvedValueOnce();    
    await loginGoogle();    
    expect(signInWithPopup).toHaveBeenCalledWith(auth, provider);
  });
});

describe('getUserId', () => {
  it('should return the current user ID', () => {
    const userId = 'user123';
    const authMock = {
      currentUser: {
        uid: userId,
      },
    };
    getAuth.mockReturnValue(authMock);
    const result = getUserId();
    expect(result).toBe(userId);
  });
});

describe('getUserName', () => {
  it('deve retornar o nome de usuário se o usuário for autenticado', () => {
    const displayName = 'Testando';
    const authMock = {
      currentUser: {
        displayName,
      },
    };
    getAuth.mockReturnValue(authMock);

    const result = getUserName();

    expect(result).toBe(displayName);
  });
});

describe('userLogout', () => {
  it('deve fazer logout do usuário', () => {
    const authMock = getAuth();
    signOut.mockResolvedValueOnce({
      user: {},
    });
    userLogout();
    expect(signOut).toHaveBeenCalledWith(authMock);
  });
});

describe('userAuthCheck', () => {
  it('chama onAuthStateChanged com authLogin e callback', () => {
    const authLogin = jest.fn();
    const callback = jest.fn();
    getAuth.mockReturnValue(authLogin);
    userAuthCheck(callback);
    expect(getAuth).toHaveBeenCalledWith(app);
    expect(onAuthStateChanged).toHaveBeenCalledWith(authLogin, callback);
  });
});

