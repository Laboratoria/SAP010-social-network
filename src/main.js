import { getUsers, db } from './lib/firebase.js';
//import { feed } from './components.js/feed.js';
//import { register } from './components.js/register.js';
import { welcome } from './components.js/welcome.js';
//import { sobre } from './components.js/sobre.js';

// rota (páginas de navegação)
const init = () => {
  const routes = {
    '': welcome,
  //  '#register': register,
  //  '#sobre': sobre,
  //  '#feed': feed,
  };

  const root = document.getElementById('root');

  // mudança da rota (atualiza a página)
  const handleHashChange = () => {
    // vai obter o valor do hash atual da URL e vai armazenar na variável hash.
    const hash = window.location.hash;
    // sempre que tiver um hash irá retornar normalmente para a const route,
    // caso não seja carregada nenhuma página, sempre irá retornar a página welcome (página inicial)
    const route = routes[hash] || welcome;
    root.innerHTML = ''; // Essa linha limpa o conteúdo do elemento HTML com o ID "root". O root é o local onde o conteúdo da página será exibido.
    // adiciona ao HTML o conteúdo que foi retornado pela função 'routes'
    root.appendChild(route());
  };

  window.addEventListener('hashchange', handleHashChange); // sempre que tiver alteração na página (no hash) este evento será chamado para atualizar o conteúdo da página

  handleHashChange();
  // chamamos a função para carregar as informações que foram atualizadas na página
};

window.addEventListener('load', () => {
  // Adiciona ações quando a página é totalmente carregada
  const root = document.getElementById('root');
  /* Chama a função getUsers passando o parâmetro db e retorna uma promessa (dados recuperados).
  Quando a promessa é resolvida, o callback (data) => console.log(data)
  pega os dados dos usuários do banco de dados e imprime no console.
  O then permite que um callback seja executado quando a promessa for resolvida,
  ou seja, quando os dados forem obtidos com sucesso. */
  getUsers(db).then((data) => console.log(data));
  // adiciona os dados dos usuários na tela inicial (welcome) ao DOM e imprime os dados no console
  root.appendChild(welcome());
  // Estamos garantindo que o conteúdo de init seja executado após tudo ser totalmente carregado

  init();
});
