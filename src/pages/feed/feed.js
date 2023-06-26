import './feed.css';

// import { getUserName, getAppAuth } from '../../configFirebase/auth';

export default () => {
  const container = document.createElement('div');

  const template = `
  <body>
  <div class="feed">
    <div class="box">
      <img class="logoCsFeed" src="./images/logo5.png">
      <h1  class="conecteh1">CONECTE - COLABORE - CULTIVE</h1>

    

        <div class="usuario">
       
         <h2 class="fulana">Olá, fulaninho(a);</h2>
         <h3 class=convite>Possui um convite? Acesse:</h3>

         <ul>
           <li><a href="about:blank">Café com Rum</a></li>
         </ul>
          <span id="username"></span>
          <button id="logoutButton" class="logout">Deslogar</button>

        </div>
        
        <div class="container2">
         <h2 class="acesseTbm"> Acesse também:</h2>
         <ul>
           <li><a href="https://www.conab.gov.br/" target="_blank">Atualizações da Conab.gov.br</a></li>
           <li><a href="https://app.powerbi.com/view?r=eyJrIjoiNDdkNDM4ZjctYzk0OS00NWVjLWFlYjktZWQ4Njg3MDEyMTg0IiwidCI6ImU2ZDkwZGYzLWYxOGItNGJkZC04MDhjLWFhNmQwZjY4YjgwOSJ9" target="_blank">Busca por Armazenadores</a></li>
            <li><a href="https://portaldeinformacoes.conab.gov.br/produtos-360.html" target="_blank">Acompanhe o preço da saca</a></li>
          </ul>

        </div>
     

        <div class="postagens">

         <div class="inputPostagem">
         <textarea class="inputMensagem" id="areaMensagem" placeholder="Compartilhe ideias e informações sobre café "></textarea>
         <button class="btnPostagem" id="postagemID">COMPARTILHAR</button>
         </div>
         </div>
         <div class="postagem">
          
        </div>
       
    </div>
  </div>
</body>

  `;

  container.innerHTML = template;
  return container;
};


