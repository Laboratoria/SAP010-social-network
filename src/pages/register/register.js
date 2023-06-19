import './register.css';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

export default () => {
  const container = document.createElement('div');

  const templateRegister = `
  <img class="logo-cs" src="./images/logo2.png">
    <fieldset>
      <h2> *CAMPOS OBRIGATÓRIOS  </h2>
      <div class="cadastro">
        <label for="name">Nome Completo*</label>
        <input type="text" id="nameRegister" placeholder="Digite seu Nome" required>
        <label for="email">E-Mail*</label>
        <input type="email" id="emailRegister" placeholder="Digite seu melhor e-mail" required>
        <label for="senha">Crie sua Senha*</label>
        <input type="password" id="senhaUsuario" placeholder="Digite sua senha" required>
      <select class="areaDeAtuacao" id="atuaçao" required>
        <option value="">Selecione a sua área de atuação*</option>
        <option value="produtor">Produtor de café</option>
        <option value="empresario">Empresário do ramo de café</option>
        <option value="comprador">Comprador ou negociante de café</option>
        <option value="outros">Outros</option>
      </select>
      </div>
      <div class="botoes">
      <button type="button" id="btn-register">Registrar</button>
      <button type="button" id="btn-home">Voltar</button>
      </div>
    </fieldset>
  `;

  container.innerHTML = templateRegister;

  const nameInput = container.querySelector('#nameRegister');
  const emailInput = container.querySelector('#emailRegister');
  const senhaInput = container.querySelector('#senhaUsuario');
  const registerButton = container.querySelector('#btn-register');
  const homeButton = container.querySelector('#btn-home')

  const registrarNovoUsuario = () => {
    const name = nameInput.value;
    const email = emailInput.value;
    const senha = senhaInput.value;
    const areaAtuacao = container.querySelector('#atuaçao').value;

    console.log('Nome:', name);
    console.log('E-Mail:', email);
    console.log('Área de Atuação:', areaAtuacao);
  };

  registerButton.addEventListener('click', registrarNovoUsuario);
  homeButton.addEventListener('click', () => {
    window.location.hash = '';
  });
  return container;
};
