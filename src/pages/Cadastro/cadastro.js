//import { createUserWithEmail } from '../../configFirebase/auth';

export default () => {
  const cadastroContainer = document.createElement('div');
  const templateCadastro = `
  <header>
    <picture><img class="logo" src="./img/logo_contraplano.png"></picture>
  </header>
  <div>
    <h2>Bem vinde a sua rede social de filmes</h2>
  </div>
    <form action="">
      <fieldset>
        <legend>Cadastre-se</legend>
        <div>
          <label for="nome-completo">Nome completo</label>
          <input type="text" class="nome-completo" id="nome-completo">
        </div>
        <div>
          <label for="usuario">Nome do usuário</label>
          <input type="text" class="usuario" id="usuario">
        </div>
        <div>
          <label for="email">Email</label>
          <input type="email" class="email" id="email">
        </div>
        <div>
          <label for="senha">Senha</label>
          <input type="password" class="senha" id="senha">
        </div>
        <button class="btn" id="btn-cad-voltar">Voltar</button>
        <button class="btn" id="btn-cad-concluir">Concluir cadastro</button>
        <button class="btn" id="btn-cad-login-google">Login com Google</button>
      </fieldset>
    </form>
  <footer>
    <h5>Bootcamp Laboratoria - Projeto Rede Social</h5>
    <h6>Desenvolvido por Larissa, Maila e Vitória</h6>
    <p>2023</p>
  </footer>`;

  cadastroContainer.innerHTML = templateCadastro;

  // Informações preenchidas pelo usuário
  const nomeEntrada = cadastroContainer.querySelector('#nome-completo');
  const nomeUsuarioEntrada = cadastroContainer.querySelector('#usuario');
  const emailEntrada = cadastroContainer.querySelector('#email');
  const senhaEntrada = cadastroContainer.querySelector('#senha');

  // Botões
  const botaoConcluir = cadastroContainer.querySelector('#btn-cad-concluir');
  const botaoVoltar = cadastroContainer.querySelector('#btn-cad-voltar');

  botaoConcluir.addEventListener("click", () => {
    window.location.hash = "#entrarLogin";
  });

  botaoVoltar.addEventListener("click", () => {
    window.location.hash = "#voltar";
  });


  const registerUser = () => {
    const name = nomeEntrada.value;
    const usuario = nomeUsuarioEntrada.value;
    const email = emailEntrada.value;
    const senha = senhaEntrada.value;

    // Chamada para a função createUserWithEmail
    // createUserWithEmail(name, usuario, email, senha)
    //   .then(() => {
    //     // Cadastro concluído com sucesso
    //   })
    //   .catch((error) => {
    //     // Lidar com erros durante o cadastro
    //   });

    // Teste cadastro
    console.log(`Nome: ${name} Usuário: ${usuario} Email: ${email} Senha: ${senha}`);
  };

  botaoConcluir.addEventListener('click', registerUser);

  botaoVoltar.addEventListener('click', () => {
    window.location.hash = '';
  });

  return cadastroContainer;
};
