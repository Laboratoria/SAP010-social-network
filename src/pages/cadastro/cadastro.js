import "./cadastro.css";

export default () => {
  const container = document.createElement("div");
  container.classList.add("container-cadastro");

  const template = `
  <p>Tela de Cadastro Nova conta</p>
  
  `;

  container.innerHTML = template;

  return container;
};
