import { loginUser, loginGoogle } from '../../lib';

export default () => {
  const container = document.createElement('div');

  const template = `
      <div class="logomarca">   
       <header>
         <img class="logo" src="imagens/logo mania de cupom.png" alt="logo" />
       </header>
       </div>    
       <section class="form" id="form">
                <img class="etiqueta" src="imagens/etiqueta de desconto preta.png" alt="etiqueta" />
                <h2>A REDE SOCIAL PARA QUEM <br> GOSTA DE ECONOMIZAR!</h2>
                <p class="email">
                <input type="text" class="inserir_email" id="inseriremail" placeholder="Digite seu e-mail"/>
                </p>
                <p class="senha">
                <input type="text" class="digite_senha" id="digitesenha" placeholder="Digite sua senha"/>
                </p> 
                <p class="form">
                <a href="/#recuperar" type="text" class="btnRecuperar" id="btnRecuperar">Esqueci minha senha</a>
                </p>
                <p class="form">
                <button class="btnLogar" id="btnLogar">LOGAR</button>
                </p>
                <p class="form">
                <button class="logarGoogle" id="btnGoogle">Entrar com Google</button>
                <p class="form">
                <a href="/#cadastrar" type="button" class="btnCadastrar" id="btnCadastrar">CADASTRE-SE</a>
                </p>
            </section>
    
    `;

  container.innerHTML = template;

  const logar = container.querySelector('.btnLogar');
  logar.addEventListener('click', () => {
    const email = container.querySelector('.inserir_email');
    const password = container.querySelector('.digite_senha');

    loginUser(email.value, password.value)
      .then(() => {
        window.location.hash = '#feed';
      })
      .catch((error) => {
        const errorMessage = error.message;
        if (email.value === '' || password.value === '') {
          alert('Todos os campos devem ser preenchidos');
        }
        if (errorMessage === 'Firebase: Error (auth/user-not-found).') {
          alert('Usuário não cadastrado');
        }
        if (errorMessage === 'Firebase: Error (auth/invalid-email).') {
          alert('E-mail inválido');
        }
        if (errorMessage === 'Firebase: Error (auth/wrong-password).') {
          alert('Senha inválida');
        }
      });
  });

  const btnGoogle = container.querySelector('.logarGoogle');
  btnGoogle.addEventListener('click', () => {
    loginGoogle()
      .then(() => {
        window.location.hash = '#feed';
      })
      .catch((error) => {
        const errorCode = errosValid(error.code);
        alert(errorCode);
      });
  });

  return container;
};
