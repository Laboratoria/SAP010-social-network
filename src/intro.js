export function intro() {
  const section1 = document.createElement('section');
  section1.setAttribute('class', 'apresentacao');

  const template = `
    <img class="img-s1" src="./images/woman-support.png">
    <article class="apresentacao">
    <p>Essa é uma rede feita de mulheres incríveis como você!<br>
        Um lugar seguro e acolhedor, onde você pode explorar sua sexualidade,<br>
        discutir saúde íntima, compartilhar experiências, dúvidas, buscar e oferecer suporte.<br>
        Viva o poder da sororidade!<br>
        Entre e sinta-se em casa.</p>
    <input type="button" class="comecar" id="comecar">
    </article>
`;

  section1.innerHTML = template;
  return section1;
}

// const menuInicial = '';

// const botaoLogin = '';
