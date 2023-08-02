import { redefinirSenha } from '../../lib/firebase';

export default () => {
  const container = document.createElement('div');
  container.id = 'csssenha';

  const template = `<nav><a href=""><img src="imagens/icon-voltar.png"></a></nav>
  <form>
  <h1>Redefinir senha</h1>
  <label for="input-redef-senha">Insira o email da conta que quer redefinir a senha:</label>
  <input type="email" id="input-redef-senha" name="email" placeholder="Email" autocomplete="off">
  <button id="enviar-email">Enviar</button>
  </form>`;

  container.innerHTML = template;

  const btnEnviarEmail = container.querySelector('#enviar-email');
  const inputEmailRedefSenha = container.querySelector('#input-redef-senha');

  btnEnviarEmail.addEventListener('click', () => {
    const emailDoUsuario = inputEmailRedefSenha.value;
    redefinirSenha(emailDoUsuario)
      .then(() => {
        // Password reset email sent!
        // ..
        alert('Email de redefinição de senha enviado com sucesso. Verifique sua caixa de entrada.');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`${errorCode} - ${errorMessage}`);
        // ..
      });
  });

  return container;
};
