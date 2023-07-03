<div align="center">

# Social Network - ExplorAí
</div>

<div align="center">

   Acesse o projeto através do [Gh-pages](https://rbcribeiro.github.io/SAP010-social-network/) e do [Firebase Hosting](https://social-network-lab-3ce72.firebaseapp.com/)
  <br>
  Status do projeto: Em andamento 🚧 <br>
  Ferramentas e tecnologias utilizadas: <br>

  <a href="https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics">
  <img src="https://skillicons.dev/icons?i=html"/>
  <a href="https://developer.mozilla.org/en-US/docs/Web/CSS">
  <img src="https://skillicons.dev/icons?i=css"/>
  <a href="https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_is_JavaScript">
  <img src="https://skillicons.dev/icons?i=js"/>
  <a href="https://git-scm.com/">
  <img src="https://skillicons.dev/icons?i=git"/>
  <a href="https://github.com/">
  <img src="https://skillicons.dev/icons?i=github"/>
  <a href="https://jestjs.io/pt-BR/">
  <img src="https://skillicons.dev/icons?i=jest"/>
  <a href="https://figma.com/">
  <img src="https://skillicons.dev/icons?i=figma"/>
  <a href="https://firebase.google.com/">
  <img src="https://skillicons.dev/icons?i=firebase"/>
  <a href="https://code.visualstudio.com/">
  <img src="https://skillicons.dev/icons?i=vscode"/>
   <a href="https://nodejs.org/en">
  <img src="https://skillicons.dev/icons?i=nodejs"/>
  </div>

  ---

  

## Índice

- [1. Resumo do projeto](#1-resumo-do-projeto)
- [2. Histórias de usuários](#2-histórias-de-usuários)
- [3. Desenho de interface do usuário](#3-desenhos-de-interface-do-usuário)
- [4. Testes de usabilidade](#4-testes-de-usabilidade)
- [5. Testes unitários](#5-testes-unitários)
- [6. Objetivos alcançados](#6-objetivos-alcançados)
- [7. Desenvolvedoras](#7-desenvolvedoras)

---
## 1. Resumo do projeto
ExplorAí é uma rede social voltada para viajantes que gostariam de compartilhar suas experiências e receber dicas sobre viagens. Neste projeto, foi desenvolvida uma SPA (Single Page Application) responsiva. 

## 2 Histórias de usuários
Foram definidas as seguintes histórias de usuários, com respectivos critérios de aceitação e definições de pronto:

__Usuário 1:__

_Como usuário, gostaria de ter uma conta na rede social, na qual pudesse fazer login e logout._

Critérios de aceitação:

* O usuário pode criar sua conta pessoal;
* O usuário pode fazer login em sua conta;
* O usuário pode fazer logout de sua conta.

Definições de pronto:

* O botão cadastre-se permite que o usuário crie a sua conta pessoal com e-mail e senha após preencher seus dados.
* Através do botão entrar, o usuário pode acessar sua conta com e-mail e senha; através do botão google o usuário pode logar com sua conta do google, e através do botão facebook, o usuário pode logar com sua conta do facebook.
* Através do botão sair, o usuário pode deslogar da rede social.

__Usuário 2:__

_Como viajante, eu gostaria de trocar experiências sobre viagens com outros viajantes._

Critérios de aceitação:
* O usuário pode visualizar posts dentro da rede social;
* O usuário pode criar posts dentro da rede social.

Definição de pronto:
* Após logar, o usuário consegue visualizar posts criados por outros usuários da rede;
* Após digitar seu texto e clicar no botão compartilhar, o usuário pode publicar o seu post e permitir que outros usuários também o leiam.

__Usuário 3:__

_Como usuário, permitir que outras pessoas saibam que gostei de suas publicações._

Critério de aceitação:
* O usuário pode curtir os posts.

Definição de pronto:
* O botão curtir permite que o usuário deixe e retire o seu like nas publicações.

## 3. Desenhos de interface do usuário
### 3.1 Protótipos de baixa fidelidade

<div align="center">

#### versão mobile:
<img src="src/assets/Protótipo de baixa fidelidade versão mobile.jpeg" width="400em"/>

#### versão desktop:
<img src="src/assets/Protótipo de baixa fidelidade versão desktop.jpeg" width="400em"/>

</div>

### 3.2. Protótipos de alta fidelidade

<div align="center">

#### versão mobile:
<img src="src/assets/Protótipo de alta fidelidade - versão mobile.png" width="400em"/>

#### versão desktop:
<img src="src/assets/Protótipo de alta fidelidade versão desktop.PNG" width="400em"/>

</div>


## 4. Testes de usabilidade
 Os testes de usabilidade foram feitos com potenciais usuários primeiramente através da plataforma Figma, na qual foi feito um protótipo interativo. Demais testes foram feito ao longo do desenvolvimento do projeto através do deploy. 
 Através do feedback de usuários foram implementadas as seguintes melhorias:
 
 * Retirada da imagem abaixo das postagens na timeline na versão mobile, para que o espaço pudesse ser melhor aproveitado e para que facilitasse a visualização das últimas postagens;
 * Ajustes nas imagens dos botões de google e facebook para que ficassem exatamente das cores dos logos dos respectivos sites, afim de que o usuário identificasse mais rapidamente que se tratavam de botões de login com google e com facebook;
 * Compactação dos textos na página de login, para facilitar a visualização dos botões de registrar e cadastrar por parte do usuário.

## 5. Testes unitários

## 6. Objetivos alcançados

- [x] Criação de uma SPA;
- [x] Responsivo;
- [x] Criação dos testes;
- [x] Testes unitários cobrem mais do que 70% de statements, functions, lines e branches;
- [x] Login através do firebase;
- [x] Usuário pode criar conta;
- [x] Usuário pode logar com google, facebook e e-mail e senha;
- [x] Usuário pode recuperar a sua senha;
- [x] Somente usuários com contas válidas têm acesso permitido;
- [x] A conta do usuário deve ser um email válido;
- [x] Conteúdos digitados nos inputs de senha são secretos, podendo o usuário optar por visualizá-los ou não;
- [x] Formulários de registro e login passam por uma validação;
- [x] Em casos de erro, mensagens descritivas devem são exibidas para ajudar o usuário;
- [x] Ao publicar, é verificado se há  conteúdo no input.
- [x] O conteúdo da timeline apenas é mostrado se o usuário estiver logado;
- [x] Usuário pode publicar posts;
- [x] Usuário pode curtir publicações;
- [x] Usuário pode editar e excluir as suas publicações;
- [x] Posts são atualizados em tempo real.


## 7. Desenvolvedoras
Geane Ramos

[![Github Badge](https://img.shields.io/badge/-Github-000?style=flat-square&logo=Github&logoColor=white&link)](https://github.com/geanemr) [![Linkedin Badge](https://img.shields.io/badge/-LinkedIn-blue?style=flat-square&logo=Linkedin&logoColor=white&link)](https://www.linkedin.com/in/geane-moraes-ramos/)

Ninoska Contreras

[![Github Badge](https://img.shields.io/badge/-Github-000?style=flat-square&logo=Github&logoColor=white&link)](https://github.com/NiEl0503) [![Linkedin Badge](https://img.shields.io/badge/-LinkedIn-blue?style=flat-square&logo=Linkedin&logoColor=white&link)](https://www.linkedin.com/in/ninoska-contreras-86b075129)

Renata Ribeiro

[![Github Badge](https://img.shields.io/badge/-Github-000?style=flat-square&logo=Github&logoColor=white&link)](https://github.com/rbcribeiro) [![Linkedin Badge](https://img.shields.io/badge/-LinkedIn-blue?style=flat-square&logo=Linkedin&logoColor=white&link)](https://www.linkedin.com/in/rbcribeiro) 
