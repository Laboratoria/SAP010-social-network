import {
// signInWithPopup,
// getAuth,
// auth,
} from 'firebase/auth';

import {
  loginGoogle,
} from '../src/configFirebase/auth';

// import {
//   loginWithEmail,
// } from '../src/configFirebase/auth';

// import {
//   handleLogin,
// } from '../src/pages/login/login.js';

// import {
//   signInWithPopup,
//   signInWithEmailAndPassword,
//   signOut,
//   auth,
//   onAuthStateChanged,
//   createUserWithEmailAndPassword,
//   getAuth,
//   updateProfile,
// } from 'firebase/auth';

// import {
//   setDoc, doc, deleteDoc, updateDoc, collection, getDocs, orderBy, query, serverTimestamp,
//   getDoc, db, where,
// } from 'firebase/firestore';

// import {
//   signInWithGoogle,
//   signInWithGitHub,
//   logIn,
//   logOut,
//   registerUserWithAnotherProvider,
//   registerUser,
//   isUserLoggedIn,
//   deletePost,
//   editPost,
//   calculateTimeAgo,
//   createPost,
//   listAllPosts,
//   likePost,
//   deslikePost,
//   checkLikedPosts,
//   changeNickNameAllPosts,
//   editProfile,
// } from '../src/firebase/firebase.js';

// const mockAuth = {
//   currentUser: {
//     displayName: 'Teste',
//     email: 'teste@coffeestation.com',
//     uid: 'lzzAvTaeTgT7b9reXdVGLSpYzDA2',
//     password: '123456',
// },
// };

// mock da função firebase
jest.mock('firebase/auth', () => ({
  loginGoogle: jest.fn(),
  signInWithPopup: jest.fn(),
}));

// jest.mock('firebase/firestore');

afterEach(() => {
  jest.clearAllMocks();
});

// describe('loginWithEmail', () => {
//   it('Deveria logar com email e senha corretos', async () => {
//     const email = 'teste@coffeestation.com';
//     const password = '123456';
//     signInWithEmailAndPassword.mockResolvedValueOnce();
//     await loginWithEmail(email, password);
//     expect(signInWithEmailAndPassword).toHaveBeenCalledWith(email, password);
//   });
//   it('Deveria mostrar um erro e falhar ao logar o usuario', async () => {
//     signInWithEmailAndPassword.mockRejectedValueOnce(new Error('Erro ao logar usuário'));
//     try {
//       await loginWithEmail();
//     } catch (error) {
//       expect(error.code).toEqual('Erro ao logar usuário');
//     }
//   });
// });

describe('loginGoogle', () => {
  it('deveria ser uma função', () => {
    expect(typeof loginGoogle).toBe('function');
  });

  it('Deveria logar o usuário com a conta do google', async () => {
    loginGoogle.mockResolvedValueOnce();
    await loginGoogle();
    expect(loginGoogle).toHaveBeenCalledTimes(1);
  });
});
