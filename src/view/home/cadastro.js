import {signUpUser} from "../../lib/index.js"

export const cadastro = () => {
    
    const container = document.createElement("div");
  
    const templateCadastro = `
    
    <section class="registerpage-form">
      <img src="./img/logo.png" class="logo-repet" alt="Logo da rede social re.Pet">
  
      <form class="register-form">
  
      <label for="nome"></label>
      <input type="text" class="form-inputs-register" id="nome-cadastro" required placeholder="Nome completo">
      </input>
  
      <label for="email-cadastro"></label>
      <input type="email" class="form-inputs-register"  id="email-cadastro" required placeholder="Exemplo@email.com">
      </input>
      
      <label for="senha-cadastro"></label>
      <input type="password" class="form-inputs-register" id="senha-cadastro" required placeholder="Senha">
      </input>
  
      <label for="confirmar-senha"></label>
      <input type="password" class="form-inputs-register" id="confirmar-senha" required placeholder="Confirmar senha">
      </input>
  
      <button type="submit" id="sign-up" >Cadastrar</button>
  
      </form>
       
    </div>

    </section>
  </section>
      <h3> Já possui cadastro? <a class="entrar" href="/#login">Fazer login</a></h3>
      
      `;

//Registrar o usuario com nome,email,senha.
container.innerHTML = templateCadastro;
  
const register = container.querySelector("#sign-up")
  register.addEventListener('click', () => {
//const name = container.querySelector("#nome-cadastro")
  const email = container.querySelector("#email-cadastro");
  const password = container.querySelector("#senha-cadastro");

  signUpUser(email.value, password.value).then(() => {
  preventDefault()
    alert('Usuário cadastrado com sucesso!')
    window.location.hash = '#login'
            
}).catch((error) => {
    alert('Erro ao cadastrar, por favor verifique os campos preenchidos.')
})
})
   
    return container;

    
  };
  
