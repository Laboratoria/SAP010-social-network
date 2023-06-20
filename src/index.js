// inportar o template criado
import login from './pages/login/login.js';
import register from './pages/register/register.js';

//  Load evento de carregamento da janela/ depois printar informações na tela
const main = document.querySelector('#root');

// função para acessar cada pagina e fazer a função funcionar
const init = () => {
  window.addEventListener('hashchange', () => {
    main.innerHTML = '';
    switch (window.location.hash) {
      case ' ':
        main.appendChild(login());
        break;
      case '#register':
        main.appendChild(register());
        break;
      default:
        main.appendChild(login());
    }
  });
};

window.addEventListener('load', () => {
  main.appendChild(login()); // printar na tela
  init();
});

// Signs-in Friendly Chat.
async function signIn() {
// Sign in Firebase using popup auth and Google as the identity provider.
// var provider = new GoogleAuthProvider();
// await signInWithPopup(getAuth(), provider);
}

signIn(email, senha)
  .then(() => {
    window.location.hash = '#login';
    console.log('estamos logadas');
  })
  .catch((error) => {
    console.log(error); // Exiba o erro no console para depuração
    printErrorMessage('E-mail ou senha incorretos');
  });
