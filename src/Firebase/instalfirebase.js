import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  signInWithRedirect,
  onAuthStateChanged,

} from 'firebase/auth';
// import { routes } from '../main';

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
export const authLogin = async (email, senha) => signInWithEmailAndPassword(auth, email, senha);

//ele escuta para saber se o usuário esta logado ou não, caso esteja da o acesso, caso não ele remove e no fim chama o função routes para renderizar a página
onAuthStateChanged(auth, (user) => {
  if (user) {
    window.localStorage.setItem('token', user.accessToken);
  } else {
    window.localStorage.removeItem('token');
  }

  routes();
});

// função para login da conta do google
const authProvedor = new GoogleAuthProvider();
export const authLoginGoogle = () => signInWithRedirect(auth, authProvedor);
//                                            | trocado a função
// cadastrar novo usuário
export const newUser = async (email, senha, displayName) => {
  const authentication = getAuth(app);
  await createUserWithEmailAndPassword(authentication, email, senha);
  await updateProfile(authentication.currentUser, { displayName });
};

const provider = new FacebookAuthProvider();
export const authLoginFacebook = () => signInWithPopup(auth, provider);