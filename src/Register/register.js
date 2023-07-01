import { newUser } from '../lib/index';
import './register.css';

export const registerUser = () => {
  const container = document.createElement('div');
  const template = `
    <div class="backgroundTwo">
    </div>
    <div class="imagens">
      <img class="imagemLogo" src="Img/ImagemDesktopmap.png" alt= "Imagem Ilustrativa de pessoas interagindo">
      <img class="imagemMap" src="Img/ImagemMap.png" alt= "Mapa de GPS Ilustrativo">
      <p class="subtitulo">O melhor site de avaliações do Brasil</p>
    </div>
    <section class="form-register">
      <form class="register-form" method="POST" id="register">
        <h1 class="register-titulo">Food Review</h1>
        <p class="titulo-sub">Preencha os campos abaixo:</p>
        <div class="register-inputs">
          <input class='inputs' id='registerName' type="text" placeholder="Nome completo *" required/>
          <input class='inputs' id='registerEmail' type="email" placeholder="Email *" required/>
          <input class='inputs' id='registerPassword' type="password" placeholder="Senha *" required/>
          <span class='txtError' id='errorRegister'></span>
        </div>
        <div class="botoes-register">
          <button class="button-register" id='btnregister' type="submit">Cadastrar</button>
        </div>
        <p class="register-message">Já possui uma conta? Clique em <a href="#login" class ="messageReturn">voltar</a> e acesse.</p>
      </form>
    </section>
  `;

  container.innerHTML = template;

  const register = container.querySelector('#btnregister');
  const registerName = container.querySelector('#registerName');
  const registerEmail = container.querySelector('#registerEmail');
  const registerPassword = container.querySelector('#registerPassword');
  const errorTxt = container.querySelector('#errorRegister');

  const validarRegisterEmail = (email) => {
    const regexEmailRegister = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmailRegister.test(email)) {
      return 'Por favor digite um e-mail';
    }
    return ''; // Retorna uma string vazia se o email for válido
  };

  const validarRegisterSenha = (senha) => {
    if (senha.length < 6) {
      return 'A senha deve ter pelo menos 6 caracteres';
    }
    return '';
  };

  const validarRegisterName = (nome) => {
    const regexNameRegister = /^[A-Za-z][A-Z a-z]*$/;
    if (!regexNameRegister.test(nome)) {
      return 'Favor preencha seu nome completo.';
    }
    return '';
  };

  const registerLogin = () => {
    register.addEventListener('click', async (evento) => {
      evento.preventDefault();

      const emailInputRegister = registerEmail.value;
      const passwordRegister = registerPassword.value;
      const nameRegister2 = registerName.value;
      const nameErrorRegister = validarRegisterName(nameRegister2);
      const emailErrorRegister = validarRegisterEmail(emailInputRegister);
      const senhaErrorRegister = validarRegisterSenha(passwordRegister);

      if (nameErrorRegister || emailErrorRegister || senhaErrorRegister) {
        // Se houver algum erro de nome ou email ou senha, exiba as mensagens de erro
        errorTxt.setAttribute('style', 'display: block');
        errorTxt.innerHTML = nameErrorRegister || emailErrorRegister || senhaErrorRegister;
      } else {
        // Caso contrário, prossiga com o login
        newUser(emailInputRegister, passwordRegister, nameRegister2)
          .then(() => {
            window.location.hash = '#feed';
            alert('Cadastro efetuado com sucesso, seja bem vindo(a)!');
          })
          .catch(() => {
            errorTxt.setAttribute('style', 'display: block');
            errorTxt.innerHTML = '';
          });
      }
    });
  };
  registerLogin();

  return container;
};
