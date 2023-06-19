import { collection, addDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { app } from '../../firebase/firebase';
export const feed = () => {
  const container = document.createElement('div');

  const templateFeed = `
      <header class="feed-header">
      <p> Seja bem-vindo, usuário </p>
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
            </select>
            <br> 
            <input type="text" class="modal-input-area" id="idade" name="idade" placeholder="Idade do pet">
            
            <input type="text" class="modal-input-area" id="raca" name="raca" placeholder="Raça">

            <input type="text" class="modal-input-area" id="local" name="local" placeholder="Localização">

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
      const db = getFirestore(app);

      //criando post

      let opcao = '';

      if (document.getElementById('quero-doar').checked) {
        opcao = document.getElementById('quero-doar').value;
      } else if (document.getElementById('quero-adotar').checked) {
        opcao = document.getElementById('quero-adotar').value;
      }

      try {
        const docRef = await addDoc(collection(db, 'post'), {
          opcaoAdocao: opcao,
          idadePet: document.getElementById('idade').value,
          especie: document.getElementById('especie').value,
          sexo: document.getElementById('sexo').value,
          raca: document.getElementById('raca').value,
          localizacao: document.getElementById('local').value,
          contato: document.getElementById('contato').value,
          mensagem: document.getElementById('mensagem').value,
        });
        console.log('Document written with ID: ', docRef.id);
      } catch (e) {
        console.error('Error adding document: ', e);
      }
      
      //pegando 
      const q = query(collection(db, "post"));
     
      const querySnapshot = await getDocs(q);
      const arrayPosts = [];
      
      querySnapshot.forEach((post) => {
      const data = post.data()
      data.id = post.id;
      arrayPosts.push(data)
      
      console.log(post.id, " => ", post.data());
      });
      
      const feedPage = container.querySelector('.feed-page');
      arrayPosts.forEach((post) => {

      const postCard = document.createElement('div');
      postCard.innerHTML = `
    
    <section class='container-post'>
    <div class='post-header'> <div class="username"> Nome Sobrenome </div> <div class="user-location"> ${post.localizacao}</div> </div>
    <div class='adopt-option'> ${post.opcaoAdocao} </div>
    <div class='post-inputs'> <div class="modal-input">${post.idadePet}</div> <div class="modal-input">${post.especie}</div> <div class="modal-input">${post.sexo}</div> <div class="modal-input"> ${post.raca} </div> </div> 
    <p>${post.mensagem} </p>
    <p>Contato: ${post.contato} </p>
    </section>
  `;

      feedPage.appendChild(postCard);

      });

      const modal = document.getElementById('meuModal');
      modal.style.display = 'none';
    });

  return container;
};
