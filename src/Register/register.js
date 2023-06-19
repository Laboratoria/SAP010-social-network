import { newUser } from "../Firebase/instalfirebase";
import './register.css';

export const registerUser = () => {
  const container = document.createElement("div");
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
          <input class="inputs" type="text" placeholder="Nome completo *" required/>
          <input class="inputs" type="email" placeholder="Email *" required/>
          <input class="inputs" type="password" placeholder="Senha *" required/>
        </div>
          <button class="button-register" type="submit">Cadastrar</button>
        <p class="register-message">Já possui uma conta? <a href="#login" id="newAccount">Clique em voltar e acesse.</a></p>
      </form>
    </section>
  `;

  container.innerHTML = template;
  const voltarButton = container.querySelector("#signup");

  // Adicionar evento de clique ao botão "Voltar"
  //voltarButton.addEventListener("click", () => {
    // container.innerHTML = '';
    // container.appendChild(loginUser());
   // window.location.hash = '#login'
  //});

  return container;
};
