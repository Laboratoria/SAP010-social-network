import './infopage.css';
import CBD from '../imagens/CBDCNNCT-IMG/logodesktopsemsombra.png';

import githubicon from '../imagens/icones/githubicon.png';
import linkedin from '../imagens/icones/linkedin.png';
import voltar from '../imagens/icones/voltar.png';
import perfil from '../imagens/icones/perfil.png';
import novoPost from '../imagens/icones/novoPost.png';
import sair from '../imagens/icones/sair.png';
import { deslogar } from '../serviceFirebase/firebaseAuth';

export default () => {
  const containerInfopage = document.createElement('section');
  containerInfopage.classList.add('container-infopage');

  const templateInfopage = `
    <a href="#feed" class="img-voltar" id="iconeVoltar"><img src=${voltar} alt="icone voltar" title="Ícone para Voltar"></a>
   
     
    <section class="info-devs">
    <p class="texto2">Terceiro projeto desenvolvido para o Bootcamp Laboratoria - Turma SAP010 com o objetivo de por em prática e aferir as habilidades das alunas:</p>
    <br>

    <div class="dev-info">
        <div class="dev-item">
            <p class="texto2">Camila Gonçalves</p>
            <div class="dev-icons">
                <a href="https://github.com/CamilaVerso/" target="_blank">
                    <img id="githubCamila" class="linkedin" src=${githubicon} alt="logo para o perfil do GitHub da desenvolvedora Camila Gonçalves" title="GitHub Camila Gonçalves">
                </a>
                <a href="https://www.linkedin.com/in/camilanpgoncalves/" target="_blank">
                    <img id="linkedinCamila" class="linkedin" src=${linkedin} alt="logo para o perfil do Linkedin da desenvolvedora Camila Gonçalves" title="Linkedin Camila Gonçalves">
                </a>
            </div>
        </div>
    </div>
    <br>

    <div class="dev-info">
        <div class="dev-item">
            <p class="texto2">Diulianne Oliveira</p>
            <div class="dev-icons">
                <a href="https://github.com/Diulianne/" target="_blank">
                    <img id="githubDiulianne" class="linkedin" src=${githubicon} alt="logo para o perfil do GitHub da desenvolvedora Diulianne" title="GitHub Diulianne">
                </a>
                <a href="https://www.linkedin.com/in/diulianneoliveira/" target="_blank">
                    <img id="linkedinDiulianne" class="linkedin" src=${linkedin} alt="logo para o perfil do Linkedin da desenvolvedora Diulianne" title="Linkedin Diulianne">
                </a>
            </div>
        </div>
    </div>
    <br>

    <div class="dev-info">
        <div class="dev-item">
            <p class="texto2">Marianna Esteves</p>
            <div class="dev-icons">
                <a href="https://github.com/maristvs" target="_blank">
                    <img id="githubMariannaEsteves" class="linkedin" src=${githubicon} alt="logo para o perfil do GitHub da desenvolvedora Marianna Esteves" title="GitHub Marianna Esteves">
                </a>
                <a href="https://www.linkedin.com/in/marianna-esteves-43bb6a274/" target="_blank">
                    <img id="linkedinMariannaEsteves" class="linkedin" src=${linkedin} alt="logo para o perfil do Linkedin da desenvolvedora Marianna Esteves" title="Linkedin Marianna Esteves">
                </a>
            </div>
        </div>
    </div>
    <br>
</section>

    
     <p class="texto2"> Entre em contato conosco nas redes sociais acima. </p>
     <br>
     <p class="texto2">Para mais informações sobre o tema:</p> <br>
     <a href="https://www.msdmanuals.com/pt-br/casa/assuntos-especiais/suplementos-alimentares-e-vitaminas/canabidiol-cbd" target="_blank">Manual de Saúde para Família MSD</a> <br>
     <a href="https://abraceesperanca.org.br" target="_blank"> Associação Brasileira de Apoio Cannabis Esperança </a><br>
     <a href ="https://www.gov.br/pt-br/servicos/solicitar-autorizacao-para-importacao-excepcional-de-produtos-a-base-de-canabidiol" target="_blank"> Manual de importação ANVISA (Governo Brasileiro)</a>
     <img class="img-CBD1" src=${CBD} alt="logo app"> 
     
      <footer>
  <a href="#perfil" id="iconePerfil"><img class="iconesFooter" src=${perfil} alt="icone perfil" title="Ícone Perfil"></a>
  <a href="#novoPost" id="iconeNovoPost"><img class="iconesFooter" src=${novoPost} alt="icone criar nova postagem" title="Ícone para Nova Postagem"></a>

  <img class="iconesFooter" id="iconeSair" src=${sair} alt="icone sair" title="Ícone para Deslogar">
  </footer>
     
     `;

  containerInfopage.innerHTML = templateInfopage;

  const btnDeslogar = containerInfopage.querySelector('#iconeSair');
  btnDeslogar.addEventListener('click', async () => {
    await deslogar();
    console.log('deslogou');
    window.location.href = '#home';
  });

  return containerInfopage;
};
