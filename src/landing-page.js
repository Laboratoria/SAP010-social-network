export default () => {
  const container = document.createElement('header');

  const templates = `
    <section class="img-container">
        <img class="title-lp" src="./images/my_project-2.gif">
    </section>
    `;

  container.innerHTML = templates;

  return container;
};
