import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, GithubAuthProvider} from 'firebase/auth';
import { app, db, collection, addDoc } from './firebase.config';
import { async } from 'regenerator-runtime';

const auth = getAuth(app);

const logIn = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert('Login efetuado com sucesso');
    }).then(()=> isUserLoggedIn())
    .catch(error => console.log(error.message))
}

const isUserLoggedIn = async () => {

  console.log(auth)

  const user = auth.currentUser;

  if (user !== null) {

    const displayName = user.displayName;
    const email = user.email;
    const photoURL = user.photoURL;
    const emailVerified = user.emailVerified;
    const uid = user.uid;

    console.log(`Nome do usuário ${displayName}`);
    console.log(`O e-mail do usuário é ${email}`);
    console.log(`O id do usuário é ${uid}`);

  }//endIf

}//endIsUserLoggedIn

const signInWithGoogle = async () => {

  const provider = new GoogleAuthProvider();

  await signInWithPopup(auth, provider)
  .then((result) => {

    const credential = GoogleAuthProvider.credentialFromResult(result);
    console.log(`credential ${credential}`)
    isUserLoggedIn();
  }).catch((error) => {

    console.log(error.message);
  });
}

const signInWithGitHub = async () => {

  const provider = new GithubAuthProvider();

  await signInWithPopup(auth, provider)
  .then((result) => {

    const credential = GithubAuthProvider.credentialFromResult(result);
    console.log(`credential ${credential}`)
    isUserLoggedIn();
  }).catch((error) => {

    console.log(error.message);
  });
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

export { registerUser, logIn, signInWithGoogle, signInWithGitHub };

