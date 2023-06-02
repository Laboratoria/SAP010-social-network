import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut } from 'firebase/auth';
import { app, db, collection } from './firebase.config';
import { query, where, getDocs, setDoc, doc } from 'firebase/firestore'

const auth = getAuth(app);

const logIn = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert('Login efetuado com sucesso');
    }).then(() => isUserLoggedIn())
    .catch(error => console.log(error.message))
}

const logOut = async () => {
  await signOut(auth);
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

    return true;

  }//endIf

  return false;

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
      /*
      if(error.code === "auth/account-exists-with-different-credential"){
        alert("usuário já cadastrado com o provedor do Google")
      }
      */
      console.log(error.code)
      console.log(error.message)
    });
}

const registerUserWithAnotherProvider = async (id, name, username, email) => {
  try {

    const userData = {

      id: id,
      name: name,
      username: username,
      email: email,

    };

    await setDoc(doc(db, 'users', `${email}`), userData);
    console.log('Usuário cadastrado com sucesso');

  } catch (error) {
    console.log('Erro ao cadastrar usuário:', error.message);
  }
}

const registerUser = async (name, username, email, password) => {
  try {

    await createUserWithEmailAndPassword(auth, email, password);

    const userData = {

      id: auth.currentUser.uid,
      name: name,
      username: username,
      email: email,

    };

    await setDoc(doc(db, 'users', `${email}`), userData);

    console.log('Usuário cadastrado com sucesso');
  } catch (error) {
    console.log('Erro ao cadastrar usuário:', error.message);
  }

};

const emailAlreadyRegistered = async (email) => {
console.log("aaaaaaaaaaaaaaaaaaaaaaaaaa")
  const q = query(collection(db, "users"), where("email", "==", email));

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data().email);
    if (doc.data().email === doc.id) {
      alert("Este e-mail já está sendo utilizado por outro provedor");
    }
  });
}

export { registerUserWithAnotherProvider, registerUser, logIn, signInWithGoogle, signInWithGitHub, isUserLoggedIn, logOut, auth, emailAlreadyRegistered };