import { deletePost } from '../../firebase/firestore.js';

const delPost = (postId) => {
  if (window.confirm('Tem certeza de que deseja excluir a publicação?')) {
    deletePost(postId)
      .then(() => {
        alert('Publicação excluída com sucesso!');
      })
      .catch((error) => {
        alert('Ocorreu um erro ao excluir o post. Por favor, tente novamente mais tarde', error);
      });
  }
};

export default delPost;
