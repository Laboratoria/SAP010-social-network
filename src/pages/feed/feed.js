import { db } from '../../fireBase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

async function fetchPosts() {
  const postsCollection = collection(db, 'posts');
  const snapshot = await getDocs(postsCollection);
  const posts = [];

  snapshot.forEach((doc) => {
    posts.push(doc.data());
  });

  return posts;
}

async function showFeed() {
  const posts = await fetchPosts();
  //const rootElement = document.getElementById('root');
  const feedContainer = document.createElement('div');

  posts.forEach((post) => {
    const postElement = document.createElement('div');
    postElement.classList.add('post');

    const nameElement = document.createElement('h3');
    nameElement.textContent = post.Nome;

    const dateElement = document.createElement('p');
    dateElement.textContent = post.Data;

    const textElement = document.createElement('p');
    textElement.textContent = post.texto;

    const likeElement = document.createElement('p');
    likeElement.textContent = `Likes: ${post.like}`;

    postElement.appendChild(nameElement);
    postElement.appendChild(dateElement);
    postElement.appendChild(textElement);
    postElement.appendChild(likeElement);
    //rootElement.appendChild(postElement);
    feedContainer.appendChild(postElement)
  });

  return feedContainer;
}

export {showFeed};
