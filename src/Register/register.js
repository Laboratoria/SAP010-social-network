import { newUser } from "../Firebase/instalfirebase";
import { loginUser } from "../Login/login";
import "../Login/login.css";

export const registerUser = () => {
  const container = document.createElement("div");
  const template = `
<form class="register-form" method="POST" id="register">
    <h1 class="titulo">Food Review</h1>
    <p class="subtitulo2">Preencha os campos abaixo:</p>
    <input type="text" placeholder="Nome completo *" required/>
    <input type="email" placeholder="Email *" required/>
    <input type="password" placeholder="Senha *" required/>
    <button type="submit">Cadastrar</button>
    <button type="submit" id="signup">Voltar</button>
    <p class="message">Já tem uma conta? Clique em voltar e acesse com seu email e senha.</a></p>
  </form>
</section>
</section>
`;

  container.innerHTML = template;
  const voltarButton = container.querySelector("#signup");

  // Adicionar evento de clique ao botão "Voltar"
  voltarButton.addEventListener("click", () => {
    container.innerHTML = '';
    container.appendChild(loginUser());
  });

  return container;
};
