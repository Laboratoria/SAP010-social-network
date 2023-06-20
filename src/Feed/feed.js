import './feed.css';

export const feedUser = () => {
  const container = document.createElement('div');

  const template = `
  <body>
  <nav>
    <div class="navbar">
      <div class="container nav-container">
          <input class="checkbox" type="checkbox" name="" id="" />
          <div class="hamburger-lines">
            <span class="line line1"></span>
            <span class="line line2"></span>
            <span class="line line3"></span>
          </div>  
        <div class="logo">
          <h1>Food Review</h1>
        </div>
        <div class="menu-items">
          <li><a href="#feed">Feed</a></li>
          <li><a href="#profile">Perfil</a></li>
          <li><a href="#aboutUs">Sobre Nós</a></li>
          <li><a href="#contact">Contato</a></li>
        </div>
      </div>
    </div>
  </nav>
</body>
`;

  container.innerHTML = template;
  return container;
};

function menuOnClick() {
  document.getElementById("menu-bar").classList.toggle("change");
  document.getElementById("nav").classList.toggle("change");
  document.getElementById("menu-bg").classList.toggle("change-bg");
}
// const main = async () => {
//   const root = document.querySelector('#root');
//   root.innerHTML = template;
// }

// export default main;
