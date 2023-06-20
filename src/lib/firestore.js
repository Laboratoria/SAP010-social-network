import { collection, addDoc, doc, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/firebase';

export const criarPost = async (
  opcaoAdocao,
  idadePet,
  especie,
  sexo,
  raca,
  localizacao,
  contato,
  mensagem,
  dataAtual
) => {
  try {
    const docRef = await addDoc(collection(db, 'post'), {
      opcaoAdocao,
      idadePet,
      especie,
      sexo,
      raca,
      localizacao,
      contato,
      mensagem,
      dataAtual,
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};


//função de gerar os posts e carregar o feed
export const carregarFeed = async () => {
  const q = query(collection(db, 'post'), orderBy('dataAtual', 'desc'));
  const querySnapshot = await getDocs(q);
  const arrayPosts = [];
  querySnapshot.forEach((post) => {
    const data = post.data();
    data.id = post.id;
    arrayPosts.push(data);
    console.log(post.id, ' => ', post.data());
  });

  const feedPage = document.querySelector('.feed-page');
  feedPage.innerHTML = '';

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
};
