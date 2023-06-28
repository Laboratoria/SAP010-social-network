//import { } from "../../lib/authUser.js";

export default () => {

  //aqui recebe a função criada no authUser para login

const login = document.createElement('div');
const templateLogin = `<form>
<fieldset>
  <div>
    <label for="">Nome do usuário/E-mail</label>
    <input type="text" class="usuario" id="usuario">
  </div>
  <div>
    <label for="">Senha</label>
    <input type="password" class="senha" id="senha">
  </div>
  <button class="btn" id="btn-login-entrar">Entrar</button>
  <button class="btn" id="btn-login-esq-senha">Esqueceu a senha?</button>
  <button class="btn" id="btn-login-google">Login com Google</button>
  <button class="btn" id="btn-login-criar-conta">Não tem login? Crie sua conta agora</button>
</fieldset>
</form>`;

login.innerHTML = templateLogin;
return login;
}