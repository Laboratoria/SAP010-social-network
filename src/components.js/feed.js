import { collection, getDocs, doc, updateDoc, addDoc } from 'firebase/firestore/lite';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '../lib/firebase.js';

export const feed = () => {
  const container = document.createElement('div');

  const feedHTML = `
  <main class='bg'>  
    <nav>
      <img src="../img/logo_petchat.png" alt="Logo" class="logo">
      <ul>
        <li id="username"></li>
        <li id="logout">Sair</li>
      </ul>
    </nav>
    <section class="main">
      <div id="commentsContainer"></div>
      <form id="commentForm">
        <textarea id="commentInput" placeholder="Digite seu comentário"></textarea>
        <button type="submit">Enviar</button>
      </form>
    </section>
  <main>
  `;

  container.innerHTML = feedHTML;

  const commentsContainer = container.querySelector('#commentsContainer');
  const commentForm = container.querySelector('#commentForm');
  const commentInput = container.querySelector('#commentInput');
  const logoutElement = container.querySelector('#logout');
  const usernameElement = container.querySelector('#username');

  // Função para atualizar a contagem de likes no banco de dados
  const updateLikeCount = async (commentId, newLikeCount) => {
    const commentRef = doc(db, 'comments', commentId);
    await updateDoc(commentRef, { likes: newLikeCount });
  };

  // Função para lidar com o clique no botão de like
  const handleLikeClick = async (commentId, currentLikeCount, likeButton) => {
    const updatedLikeCount = currentLikeCount + 1;
    likeButton.innerText = 'Likes: ' + updatedLikeCount;
    likeButton.disabled = true;
    await updateLikeCount(commentId, updatedLikeCount);
  };

  // Função para exibir os comentários no feed
  const displayComments = (comments) => {
    commentsContainer.innerHTML = '';
    comments.forEach((comment) => {
      const commentElement = document.createElement('div');
      commentElement.classList.add('comment');

      const commentTextElement = document.createElement('p');
      commentTextElement.textContent = comment.text;
      commentElement.appendChild(commentTextElement);

      const likeButton = document.createElement('button');
      likeButton.textContent = 'Likes: ' + comment.likes;
      likeButton.addEventListener('click', () => {
        handleLikeClick(comment.id, comment.likes, likeButton);
      });
      commentElement.appendChild(likeButton);

      commentsContainer.appendChild(commentElement);
    });
  };

  // Função para buscar os comentários do banco de dados
  const fetchComments = async () => {
    try {
      const commentsRef = collection(db, 'comments');
      const querySnapshot = await getDocs(commentsRef);
      const comments = querySnapshot.docs.map((commentDoc) => {
        const commentData = commentDoc.data();
        return {
          id: commentDoc.id,
          text: commentData.text,
          likes: commentData.likes || 0,
        };
      });
      displayComments(comments);
    } catch (error) {
      alert('Erro ao buscar comentários: ' + error);
    }
  };

  // Função para enviar um novo comentário para o banco de dados
  const sendComment = async (commentText) => {
    try {
      const commentData = {
        text: commentText,
        likes: 0,
      };
      await addDoc(collection(db, 'comments'), commentData);
    } catch (error) {
      alert('Erro ao enviar comentário: ' + error);
    }
  };

  // Função para buscar os dados do usuário autenticado
  const getUserData = async () => {
    const user = auth.currentUser;
    if (user) {
      return user.displayName;
    }
    throw new Error('Usuário não autenticado');
  };

  // Função para exibir o nome do usuário no cabeçalho
  const displayUsername = async () => {
    try {
      const username = await getUserData();
      console.log(username); // Verifique se o nome do usuário está sendo retornado corretamente
      usernameElement.textContent = username;
    } catch (error) {
      console.log(`Erro ao buscar dados do usuário: ${error}`);
    }
  };

  // Função para adicionar o listener de autenticação
  const addAuthListener = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        displayUsername();
        fetchComments();
      } else {
        // Aqui você pode redirecionar para a página de login ou fazer outras ações
      }
    });
  };

  // Evento de carregamento da página
  window.addEventListener('load', () => {
    addAuthListener();
  });

  // Função para realizar o logout do usuário
  const logoutUser = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      alert('Erro ao fazer logout: ' + error);
    }
  };

  // Evento de envio do formulário de comentário
  commentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const commentText = commentInput.value.trim();
    if (commentText !== '') {
      await sendComment(commentText);
      commentInput.value = '';
      fetchComments();
    }
  });

  // Evento de clique no botão de logout
  logoutElement.addEventListener('click', () => {
    logoutUser();
  });

  return container;
};
