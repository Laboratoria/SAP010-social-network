import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from './firebase.config';

const auth = getAuth(app);

const registerUser = async (name, username, email, password) => {
  try {
    const userRegister = await createUserWithEmailAndPassword(auth, email, password);
    const user = userRegister.user;
  } catch (error) {
    console.log('Erro ao registrar usuário:', error.message);
  }
};

export { registerUser };