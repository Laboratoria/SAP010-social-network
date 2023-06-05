export const home = () => {
    const container = document.createElement('div');

    const templateHome = `
    <img src="./img/logo.png" alt="Logo da rede social re.Pet">

    <section>
      <p> Já possui cadastro?</p>
      <a class="entrar" href="/#login">Entrar</a>
      <p> Não possui cadastro?</p>
      <a class="cadastrar" href="/#cadastro">Cadastrar</a>
    </section>
    `;

    container.innerHTML = templateHome;

    return container;
}

export const login = () => {
    const container = document.createElement('div');

    const templateLogin = `
    <img src="./img/logo.png" alt="Logo da rede social re.Pet">

    <form>
    <label for="email">Email</label>
    <input type="email" id="email-login" required placeholder="Email">
    </input>
    
    <label for="senha">Senha</label>
    <input type="password" id="senha-login" required placeholder="Senha">
    </input>

    <input type="submit" class="entrar">Entrar</a>

    </form>

    <a>Botão Google</a>

    <h3> Não possui cadastro? <a class="criar-conta" href="/#cadastro">Criar conta</a></h3>

    `;
    container.innerHTML = templateLogin;

    return container;
}

export const cadastro = () => {
    const container = document.createElement('div');

    const templateCadastro = `
    <img src="./img/logo.png" alt="Logo da rede social re.Pet">

    <form>

    <label for="nome">Nome completo</label>
    <input type="text" id="nome" required placeholder="Nome completo">
    </input>

    <label for="email">Email</label>
    <input type="email" id="email-cadastro" required placeholder="Email">
    </input>
    
    <label for="senha">Senha</label>
    <input type="password" id="senha-cadastro" required placeholder="Senha">
    </input>

    <label for="confirmar-senha"> Confirmar senha</label>
    <input type="password" id="confirmar-senha" required placeholder="Senha">
    </input>

    <input type="submit" class="entrar">Cadastrar</a>

    </form>

    <a>Botão Google</a>

    <h3> Já possui cadastro? <a class="entrar" href="/#login">Fazer login</a></h3>

    `;
    container.innerHTML = templateCadastro;

    return container;
}

