import { app, auth } from './firebase.config';

const registerUser = async (name, username, email, password) => {
  const userRegister = await auth.createUserWithEmailAndPassword(email, password);
  const user = userRegister.user;
  return userRegister;
};

export { registerUser };
