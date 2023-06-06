import { auth} from "../firebase/firebase";

const signUpForm = document.getElementById("signup-form");



export const signUpUser = (event) => {
  
  event.preventDefault();
  let email = document.getElementById("email-cadastro");
  let password = document.getElementById("senha-cadastro");


  createUserWithEmailAndPassword(auth,email,password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert("Usuário registrado com sucesso");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("mensagem de erro");
    });
};

