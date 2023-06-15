import { newUser } from "../Firebase/instalfirebase";
import { loginUser } from "../Login/login";
import "../Register/register.css";

export const registerUser = () => {
  const container = document.createElement("div");
  const template = `
    <div class="backgroundTwo">
      <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" class="shape-fill"></path>
      </svg>
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
          <input class="inputs" type="text" placeholder="Nome completo *" required/>
          <input class="inputs" type="email" placeholder="Email *" required/>
          <input class="inputs" type="password" placeholder="Senha *" required/>
        </div>
        <div class="botoes-register">
          <button class="buttons-register" type="submit">Cadastrar</button>
          <button class="buttons-register" type="submit" id="signup">Voltar</button>
        </div>
        <p class="register-message">Já possui uma conta? Clique em voltar e acesse.</a></p>
      </form>
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
