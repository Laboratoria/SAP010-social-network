import { carregarPosts, criarPost } from '../../lib/firestore.js';
import { getCurrentUser } from '../../lib/index.js';
let username = ''
export const feed = () => {
  const container = document.createElement('div');
  const templateFeed = `
      <header class="feed-header">
      <p> Seja bem-vindo(a) ${username} </p>
      <a class="feedPage" href="/#feed"></a>

      <button id="post">Crie seu post aqui!</button>
      </header>
      <section class="feed-page"></section>
      <div id="meuModal" class="modal">
        <div class="modal-content">
          <span class="fechar">&times;</span>
       
          <form id="form-post">
            <br>
            
            <input type="radio"  id="quero-adotar" name="quero" value="Quero adotar">
            <label for="quero-adotar">Quero adotar</label>
           
            <input type="radio"  id="quero-doar" name="quero" value="Quero doar">
            <label for="quero-doar">Quero doar</label>
            <br>
            
            <label for="especie">Espécie:</label>
            <select name="select" id="especie" class="modal-input-area">
            <option value="" selected disabled >Selecionar</option>
            <option value="Cachorro">Cachorro</option>
            <option value="Gato" >Gato</option>
            <option value="Outros">Outros</option>
            </select>
 
            <label for="sexo">Sexo:</label>
            <select name="select" id="sexo" class="modal-input-area">
            <option value="" selected disabled >Selecionar</option>
            <option value="Fêmea">Fêmea</option>
            <option value="Macho">Macho</option>
            <option value="Sem Preferência">Sem Preferência</option>
            <br>
            </select>
            <br>
            <label for="idade">Idade do pet:</label>
            <select name="select" id="idade" class="modal-input-area">
            <option value="" selected disabled >Selecionar</option>
            <option value="Filhote">Filhote</option>
            <option value="Adulto">Adulto</option>
            <option value="Idoso">Idoso</option>
            <option value="Sem Preferência">Sem Preferência</option>

            <br>
            <label for="raca">Raça:</label>
            <input type="text" class="modal-input-area" id="raca" name="raca" placeholder="Exemplo: Bulldog">
            <br>
            
            
            <label for="localização">Localização:</label>
            <input type="text" class="modal-input-area" id="local" name="local" placeholder="Exemplo: Curitiba/PR">

            <input type="text" class="modal-input-area" id="contato" name="contato" placeholder="(xx) xxxxx-xxxx">
            <br>
            <textarea id="mensagem" name="mensagem" rows="4" cols="20" placeholder=" Escreva sua mensagem aqui."></textarea>
            <br>


            <button type="submit" class="publicar" id="publicar">Publicar</button>
            </form>

        </div>
      </div>
    
  `;

  container.innerHTML = templateFeed;

  

  const carregarFeed = async () => {
    const posts = await carregarPosts();
    const feedPage = container.querySelector('.feed-page');
    feedPage.innerHTML = '';
    
    posts.forEach((post) => {
      const postCard = document.createElement('div');
      postCard.innerHTML = `
        <section class='container-post'>
          <div class='post-header'>
            <div class="username">${username}</div>
            <div class="user-location">${post.localizacao}</div>
          </div>
          <div class='adopt-option'>${post.opcaoAdocao}</div>
          <div class='post-inputs'>
            <div class="modal-input">${post.idadePet}</div>
            <div class="modal-input">${post.especie}</div>
            <div class="modal-input">${post.sexo}</div>
            <div class="modal-input">${post.raca}</div>
          </div>
          <p>${post.mensagem}</p>
          <p>Contato: ${post.contato}</p>
        </section>
      `;
      

      feedPage.appendChild(postCard);
    });
  };

  carregarFeed();

  container.querySelector('#post').addEventListener('click', () => {
    const modal = document.getElementById('meuModal');
    const fechar = modal.querySelector('.fechar');

    // Ao clicar no botão, exibe o modal
    modal.style.display = 'block';

    // Ao clicar no botão de fechar, fecha o modal
    fechar.onclick = function () {
      modal.style.display = 'none';
    };
  });

  container
    .querySelector('#publicar')
    .addEventListener('click', async (event) => {
      event.preventDefault();
      let opcao = '';
      if (document.getElementById('quero-doar').checked) {
        opcao = document.getElementById('quero-doar').value;
      } else if (document.getElementById('quero-adotar').checked) {
        opcao = document.getElementById('quero-adotar').value;
      }
      const opcaoAdocao = opcao;
      const idadePet = document.getElementById('idade').value;
      const especie = document.getElementById('especie').value;
      const sexo = document.getElementById('sexo').value;
      const raca = document.getElementById('raca').value;
      const localizacao = document.getElementById('local').value;
      const contato = document.getElementById('contato').value;
      const mensagem = document.getElementById('mensagem').value;
      const dataAtual = Date.now();

      const dadosPost = {
        opcaoAdocao,
        idadePet,
        especie,
        sexo,
        raca,
        localizacao,
        contato,
        mensagem,
        dataAtual,
      };
      await criarPost(dadosPost);

      // Limpa os campos do formulário
      document.getElementById('quero-doar').checked = false;
      document.getElementById('quero-adotar').checked = false;
      document.getElementById('idade').value = '';
      document.getElementById('especie').value = '';
      document.getElementById('sexo').value = '';
      document.getElementById('raca').value = '';
      document.getElementById('local').value = '';
      document.getElementById('contato').value = '';
      document.getElementById('mensagem').value = '';

      // Recarrega o feed com a nova postagem
      await carregarFeed();
      const modal = container.querySelector('#meuModal');
      modal.style.display = 'none';
    });

  return container;
}

getCurrentUser().then((currentUser) => {
  username = currentUser.displayName;
});