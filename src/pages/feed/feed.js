import './feed.css';
import { publicações } from '../../configFirebase/post.js';

export default () => {

  const container = document.createElement('div');

  const template = `
  <div class="container">

      <div class="logo"> 
      <img src="./images/logo5.png">
      </div>

        <section class="menu">
         <h2 class="saudacao">Olá, <span id="nome-usuario">fulaninho(a)</span>!</h2>
         <h3 class="convite">Possui um convite? Acesse:</h3>
         <ul>
           <li><a href="#cafeComRum">Café com Rum</a></li>
         </ul>
          <button id="logoutButton" class="logout">Deslogar</button>
        </section>
        
        <section class="filtros">
         <h2 class="saudacao">Acesse também:</h2>
         <ul>
           <li><a href="https://www.conab.gov.br/" target="_blank">Atualizações da Conab.gov.br</a></li>
           <li><a href="https://app.powerbi.com/view?r=eyJrIjoiNDdkNDM4ZjctYzk0OS00NWVjLWFlYjktZWQ4Njg3MDEyMTg0IiwidCI6ImU2ZDkwZGYzLWYxOGItNGJkZC04MDhjLWFhNmQwZjY4YjgwOSJ9" target="_blank">Busca por Armazenadores</a></li>
            <li><a href="https://portaldeinformacoes.conab.gov.br/produtos-360.html" target="_blank">Acompanhe o preço da saca</a></li>
          </ul>
          <img class="fundo" src="./images/background-filtros.png">
        </section>
     
        <div class="postagens">
         <textarea class="inputMensagem" id="areaMensagem" placeholder="Compartilhe ideias e informações sobre café"></textarea>
         <button class="btnPostagem" id="postagemID"><img src="./images/icons/enviar-publicacao.svg"></button>
         </div>

         <div class="postagem">
        </div>

      </div>
  `;

  container.innerHTML = template;

  const btnPostagem = container.querySelector('#postagemID');

  btnPostagem.addEventListener('click', async () => {
    const mensagem = container.querySelector('#areaMensagem').value;
    
    if (mensagem.length > 0){
      await publicações()
    } else {
      alert ("Digite sua mensagem!")
    }});
    
  return container;
};
