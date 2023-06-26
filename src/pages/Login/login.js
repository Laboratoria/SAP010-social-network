export default () => {

const login = document.createElement('div');
const templateLogin = `<form>
<fieldset>
  <div>
    <label for="">Nome do usuário</label>
    <input type="text" class="usuário" id="usuário">
  </div>
  <div>
    <label for="">Senha</label>
    <input type="password" class="senha" id="senha">
  </div>
  <a href="/#entrarLogin">Entrar</a>
  <a href="/#esqueceuSenha">Esqueceu a senha?</a>
  <a href="/#loginGoogle">Login com Google</a>
  <a href="/#criarConta">Não tem login? Crie sua conta agora</a>
</fieldset>
</form>`;

login.innerHTML = templateLogin;

return login;
}