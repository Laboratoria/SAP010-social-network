import './feed.css';

export const feedUser = () => {
  const container = document.createElement('div');

  const template = ` 
  <header>
  <h1>Food Review</h1>
  </header>

  <section>
  <div class="boxExperience">
    <button id="experienceButton" class="experience-button">Qual experiência você teve hoje?</button>
  </div>
  </section>

  <div id="createPost" class="post">
    <div class="post-content">
    <span id= "close" class="close" onclick="closeModal()">&times;</span>
    <form>
      
      <span id="userName"></span>
      
      <label for="postContent"> </label>
      <textarea id="postContent" placeholder="Qual experiência você teve hoje?" required></textarea>

      <label for="postLocation">Restaurante:</label>
      <input type="text" id="postLocation" required>

      <button id="publishButton" onclick="publishPost()">Publicar</button>
    </form>
    </div>
  </div>
  `;

  container.innerHTML = template;

  const modal = container.querySelector('#createPost');
  const closeButton = container.querySelector('#close');
  // const publishButton = container.getElementById('publishButton');
  const openPublishButton = container.querySelector('#experienceButton');

  // Função para abrir o modal
  function openModal() {
    modal.style.display = 'block'; // Exibe o modal
  }

  // Função para fechar o modal
  function closeModal() {
    modal.style.display = 'none'; // Oculta o modal
  }

  openPublishButton.addEventListener('click', openModal);
  closeButton.addEventListener('click', closeModal);
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  // Esse trecho de código permite fechar o modal quando o usuário clica fora da área do modal.

  return container;
};
