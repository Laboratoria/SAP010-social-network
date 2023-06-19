import './register.css';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';



export default () => {
  const container = document.createElement('div');

  const templateRegister = `
    <fieldset>
       <h1>
      <legend> Cadastre-se</legend>
      <img class="logo4" src="./images/logo4.png">
       </h1>

      <legend> *CAMPOS OBRIGATÓRIOS  </legend>
      <ul class="FormularioCadastroNome">
        <label for="name">Nome Completo*</label><p>
        <input type="text" id="nameRegister" placeholder="Digite seu Nome" >
      </ul>
      <ul class="FormularioCadastroEmail">
        <label for="email">E-Mail*</label><p>
        <input type="email" id="emailRegister" placeholder="Digite seu melhor e-mail" >
      </ul>
      <ul class="FormularioCadastro">
        <label for="senha">Crie sua Senha*</label><p>
        <input type="password" id="senhaUsuario" placeholder="Digite sua senha" >
      </ul>
      <select class="areaDeAtuacao" id="atuaçao">
        <option value="">Selecione a sua área de atuação*</option>
        <option value="produtor">Produtor de café</option>
        <option value="empresario">Empresário do ramo de café</option>
        <option value="comprador">Comprador ou negociante de café</option>
        <option value="outros">Outros</option>
      </select><p>
      <button type="button" id="btn-register">Registrar</button><p>
    </fieldset>
  `;

  container.innerHTML = templateRegister;

  const nameInput = container.querySelector('#nameRegister');
  const emailInput = container.querySelector('#emailRegister');
  const senhaInput = container.querySelector('#senhaUsuario');
  const registerButton = container.querySelector('#btn-register');

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

  return container;
};
