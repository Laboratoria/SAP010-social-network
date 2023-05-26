import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import { app, db, collection, addDoc  } from './firebase.config';

const auth = getAuth(app);

const logIn = async (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
  .then(() =>{
    alert('Login efetuado com sucesso');
  }) .catch(error => console.log(error.message))
}

const registerUser = async (name, username, email, password) => {
  try {
    const userRegister = await createUserWithEmailAndPassword(auth, email, password);
    const user = userRegister.user;
    const userData = {

      name: name,
      username: username,
      email: email,

    };

    await addDoc(collection(db, 'users'), userData);

    console.log('Usuário cadastrado com sucesso');
  } catch (error) {
    console.log('Erro ao cadastrar usuário:', error.message);
  }
};

export { registerUser, logIn, auth };

