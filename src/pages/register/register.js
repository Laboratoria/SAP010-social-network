import '../../pages/register/register.css';


export default () => {
  

  const container = document.createElement('div');

  const templateRegister = `
    <div class="imagens">
      <img class="logo-cs" src="./images/logo2.png">
      <img class="imagem-fundo" src="./images/background-desktop.png">
    </div>
    <fieldset>
      <h2>*CAMPOS OBRIGATÓRIOS</h2>
      <div class="cadastro">
        <label for="name">Nome Completo*</label>
        <input type="text" id="nameRegister" placeholder="Digite seu Nome" required>
        <label for="email">E-Mail*</label>
        <input type="email" id="emailRegister" placeholder="Digite seu melhor e-mail" required>
        <label for="senha">Crie sua Senha*</label>
        <input type="password" id="senhaUsuario" placeholder="Digite sua senha" required>
        <select class="areaDeAtuacao" id="atuaçao" required>
          <option value="" hidden>Selecione a sua área de atuação*</option>
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
      <p id="error-message" class="error-message"></p>
    </fieldset>
  `;

  container.innerHTML = templateRegister;

  
  registerButton.addEventListener('click', registerUser);
  homeButton.addEventListener('click', () => {
    window.location.hash = '';
  });

  return registrationForm;
};
