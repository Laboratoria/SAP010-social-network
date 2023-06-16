export const feed = () => {
  const container = document.createElement('div');

  const templateFeed = `
    <section class="feed-page">
      <p> Seja bem-vindo, usuário </p>
      <a class="feedPage" href="/#feed"></a>

      <button id="post">Crie seu post aqui!</button>

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
            <input type="text" id="idade" name="idade" placeholder="Idade do pet">
            <label for="especie">Espécie:</label>
            <select name="select" id="especie">
            <option value="" selected disabled >Selecionar</option>
            <option value="Cachorro">Cachorro</option>
            <option value="Gato" >Gato</option>
            <option value="Outros">Outros</option>
            </select>
 
            <label for="sexo">Sexo:</label>
            <select name="select" id="sexo">
            <option value="" selected disabled >Selecionar</option>
            <option value="Fêmea">Fêmea</option>
            <option value="Macho">Macho</option>
            </select>
            <br> 

            <input type="text" id="raca" name="raca" placeholder="Raça">

            <input type="text" id="local" name="local" placeholder="Localização">

            <input type="text" id="contato" name="contato" placeholder="(xx) xxxxx-xxxx">
            <br>
            <textarea id="mensagem" name="mensagem" rows="4" cols="20" placeholder=" Escreva sua mensagem aqui."></textarea>
            <br>


            <button type="submit" class="publicar" id="publicar">Publicar</button>
            </form>

        </div>
      </div>
    </section>
  `;

  container.innerHTML = templateFeed;

  container.querySelector('#post').addEventListener('click', () => {
    const modal = document.getElementById("meuModal");
    const fechar = modal.querySelector(".fechar");

    // Ao clicar no botão, exibe o modal
    modal.style.display = "block";

    // Ao clicar no botão de fechar, fecha o modal
    fechar.onclick = function() {
      modal.style.display = "none";
    }

  });
  

container.querySelector('#publicar').addEventListener('click', (event) => {
  event.preventDefault(); 
  
  let opcao = ""
    
    if (document.getElementById('quero-doar').checked) {
       opcao = document.getElementById('quero-doar').value
    } else if (document.getElementById('quero-adotar').checked) {
       opcao = document.getElementById('quero-adotar').value
    }

  const idadePet = document.getElementById('idade').value;
  const especie = document.getElementById('especie').value;
  const sexo = document.getElementById('sexo').value;
  const raca = document.getElementById('raca').value;
  const localizacao = document.getElementById('local').value;
  const contato = document.getElementById('contato').value;
  const mensagem = document.getElementById('mensagem').value;


  const post = document.createElement('div');
  post.innerHTML = `
    
    <section class='container'>
    <div class='post-header'> Nome Sobrenome | ${localizacao} </div>
    <div> ${opcao} </div>
    <div class='post-inputs'> Idade do pet: ${idadePet} Espécie: ${especie} ${sexo} Raça: ${raca} </div> 
    <p>${mensagem} </p>
    <p>Contato: ${contato} </p>
    </section>
  `;

  
  const feedPage = document.querySelector('.feed-page');
  feedPage.appendChild(post);

  
  const modal = document.getElementById('meuModal');
  modal.style.display = 'none';
});
  

  return container;
};
