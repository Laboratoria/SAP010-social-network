import {signUpUser} from "../../lib/index.js"

export const cadastro = () => {
    
    const container = document.createElement("div");
  
    const templateCadastro = `
      <img src="./img/logo.png" class="logo-repet" alt="Logo da rede social re.Pet">
  
      <form onsubmit="signUpUser()">
  
      <label for="nome">Nome completo</label>
      <input type="text" class="form-inputs" id="nome-cadastro" required placeholder="Nome completo">
      </input>
  
      <label for="email-cadastro">Email</label>
      <input type="email" class="form-inputs" id="email-cadastro" required placeholder="Email">
      </input>
      
      <label for="senha-cadastro">Senha</label>
      <input type="password" class="form-inputs" id="senha-cadastro" required placeholder="Senha">
      </input>
  
      <label for="confirmar-senha"> Confirmar senha</label>
      <input type="password" class="form-inputs" id="confirmar-senha" required placeholder="Senha">
      </input>
  
      <button type="submit" id="sign-up" class="loginpage-button">Cadastrar</button>
  
      </form>
  
      <a>Botão Google</a>
  
      <h3> Já possui cadastro? <a class="entrar" href="/#login">Fazer login</a></h3>
      
      `;
    container.innerHTML = templateCadastro;
  
    return container;

    
  };
  
