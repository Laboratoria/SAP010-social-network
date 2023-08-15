// aqui serão criado os templates

export default () => {
    const container = document.createElement('div');
  
    const template = `
    <div class="login">
      <div class="descricao">
        <p>
          Uma rede social segura para mulheres que curte viajar 
          sozinha e gosta compartilhar dicas,  experiências 
          sobre as viagens e também  fazer novas amizades.
        </p>
        
      </div>
      <form>
        <h2>Login</h2>
        
        <input id="email" type="text" name="email" placeholder="Seu email..."/>
        
        <input type="password" name="senha" placeholder="Sua senha..."/>
        <button type="submit">ENTRAR</button>
      </form>
    </div>
    `;


    container.innerHTML = template
  
    
    return container;
    
  }

  /*const email = document.getElementById('email')

    email.addEventListener('focus', ()=>{
      email.style.borderColor = "#B31F85";
    })
  */