import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDSedT4wQAFd6nZqtK9xWVLPVSRAj9y9dE',
  authDomain: 'rede-social-2c0e4.firebaseapp.com',
  projectId: 'rede-social-2c0e4',
  storageBucket: 'rede-social-2c0e4.appspot.com',
  messagingSenderId: '204673635885',
  appId: '1:204673635885:web:c3aaf53fe7e32b3f024aa4',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// função para fazer login do usuario
export const authLogin = (email, senha) => signInWithEmailAndPassword(auth, email, senha);

// função para login da conta do google
const authProvedor = new GoogleAuthProvider();
export const authLoginGoogle = () => signInWithPopup(auth, authProvedor);

// cadastrar novo usuário
export const newUser = async (email, senha, displayName) => {
  const authentication = getAuth(app);
  await createUserWithEmailAndPassword(authentication, email, senha);
  await updateProfile(authentication.currentUser, { displayName });
};

const provider = new FacebookAuthProvider();
export const authLoginFacebook = () => signInWithPopup(auth, provider);