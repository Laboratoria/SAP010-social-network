export function pedirCadastro() {
  const section2 = document.createElement('section');
  section2.setAttribute('class', 'pedir-cadastro');

  const template = `
    <img class="img-s2" src="./images/heart.jpeg">
    <article>
        <input type="button" class="cadastrar">
            <div>
                <p>Já tem uma conta?</p>
                <p><input type="button" class="singin">log in</p>
            </div>
    </article>
    `;

  section2.innerHTML = template;
  return section2;
}
