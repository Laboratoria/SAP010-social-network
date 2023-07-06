import './sobre.css';

export const aboutUs = () => {
  const container = document.createElement('div');
  const template = `
    <header>
    <nav>
      <div class="navbar">
        <div class="container nav-container">
          <input class="checkbox" type="checkbox" name="" id=""/>
          <div class="hamburger-lines">
            <span class="line line1"></span>
            <span class="line line2"></span>
            <span class="line line3"></span>
          </div>
          <div class="nameHeader">
            <h1>Food Review</h1>
          </div>
          <div class="menu-items">
            <li><a href="#feed">Feed</a></li>
            <li><a href="#sobre">Sobre</a></li>
            <li><a href="#sair">Sair</a></li>
          </div>
        </div>
      </div>
    </nav>
  </header>
      <div id="cubeContainer">
          <div id="cubeWrapper">
              <div class="head">
                  <h1>SOBRE NÓS</h1>
              </div>
              <div id="cubes">
            <div class="cube p1">
                <div class="name">
                    <h1>Mislene Moura</h1>
                    <p>Web Developer</p>
                </div>
                <div class="innerBorder"></div>
                <div class="darken"></div>
                <div class="content">
                    <ul>
                        <li><a href="https://www.linkedin.com/in/mislenemoura/" target="_blank"><span class="fab fa-linkedin"></span></a></li>
                        <li><a href="https://github.com/MisleneSM" target="_blank"><span class="fab fa-github"></span></a></li>
                    </ul>
                </div>
            </div>
            <div class="cube p2">
                <div class="name">
                    <h1>Nívia Miranda</h1>
                    <p>Web Developer</p>
                </div>
                <div class="innerBorder"></div>
                <div class="darken"></div>
                <div class="content">
                    <ul>
                      <li><a href="https://www.linkedin.com/in/niviacristina/" target="_blank"><span class="fab fa-linkedin"></span></a></li>
                      <li><a href="https://github.com/Nivicris" target="_blank"><span class="fab fa-github"></span></a></li>
                    </ul>
                </div>
            </div>
            <div class="cube p3">
                <div class="name">
                    <h1>Roxane Príncipe</h1>
                    <p>Web Developer</p>
                </div>
                <div class="innerBorder"></div>
                <div class="darken"></div>
                <div class="content">
                    <ul>
                      <li><a href="https://www.linkedin.com/in/roxaneprincipe/" target="_blank"><span class="fab fa-linkedin"></span></a></li>
                      <li><a href="https://github.com/roxanevp" target="_blank"><span class="fab fa-github"></span></a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
      <p class="aboutUs">O Food Review é um website voltado para os amantes de lugares culinários, com intuito de trazer referências e restaurantes de vários tipos e gostos para os nossos usuários. Além disso, você terá a oportunidade de fazer suas próprias recomendações, interagir com publicações e posts, e expressar suas preferências com like e deslikes, de acordo com seu gosto pessoal. </p>
      </div>
      <nav class="nav__cont">
        <ul class="nav">
          <li class="nav__items"><a href="#feed"><img src="Img/home-feed.svg"/>Feed</a></li>
          <li class="nav__items"><a href="#sobre"><img src="Img/info-feed.svg"/>Sobre</a></li>
          <li class="nav__items"><a href="#sair"><img src="Img/logout-feed.svg"/>Sair</a></li>
        </ul>
      </nav>
`;
  container.innerHTML = template;
  return container;
};
