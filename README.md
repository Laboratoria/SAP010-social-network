# Criando uma Rede Social

## Índice

* [1. Prefácio](#1-prefácio)
* [2. Objetivos de aprendizagem](#2-objetivos-de-aprendizagem)
* [3. Histórias de usuário](#3-histórias-de-usuário)
* [4. Testes unitários](#4-testes-unitários)
* [5. Considerações gerais](#5-considerações-gerais)

***

## 1. Prefácio

Instagram, Snapchat, Twitter, Facebook, Twitch, Linkedin, etc. As redes sociais
invadiram nossas vidas. Nós as amamos ou odiamos, e muitas pessoas não conseguem
viver sem elas. Redes sociais contém vários tipos de nichos diferentes de acordo com as necessidades do usuário.
## 2. Resumo do projeto

Neste projeto nós construímos uma Rede Social sobre defesa pessoal para mulheres. É direcionado para mulheres que desejam receber dicas de como se defender de possíveis ataques e violências, contando com uma rede de apoio disposta a ajudar independente do nível de conhecimento (iniciante, intermediário ou avançado), que também fica exposto nas postagens de cada usuário. Nossa Rede Social permite à qualquer usuário criar uma conta de acesso, logar-se com ela, criar, editar e deletar publicações.

## 2. Objetivos de aprendizagem

O objetivo principal de aprendizagem deste projeto foi construir uma Single-page Application (SPA) responsiva (com mais de uma tela/ página) na qual seja possível ler e escrever dados.

Neste projeto o _boilerplate_ não foi incluído, portanto tivemos que organizar e definir nossa própria estrutura de pastas e escrevemos nossos próprios testes unitários.

Os principais objetivos de aprendizagem atingidos foram:

### Centrado no usuário, Design de produto

- [X] **Desenhar e desenvolver um produto ou serviço colocando as usuárias no centro**
- [X] **Aplicar os princípios de desenho visual (contraste, alinhamento, hierarquia)**
- [X] **Criar protótipos para obter feedback e iterar**

**Protótipos de baixa e alta fidelidade:**

![baixa-fidelidade1](https://github.com/amandascam03/SAP010-social-network/assets/131325234/19da3c93-25a5-4b83-a0b4-4be8c7d739ee)
![baixa-fidelidade2](https://github.com/amandascam03/SAP010-social-network/assets/131325234/521723c7-d7ca-448c-b804-0cca2e4a1a89)
![alta-fidelidade](https://github.com/amandascam03/SAP010-social-network/assets/131325234/9178abcc-2db0-4841-939e-a06737ca3f63)

### HTML

- [X] **Uso de HTML semântico**

### CSS

- [X] **Uso de seletores de CSS**
- [X] **Modelo de caixa (box model): borda, margem, preenchimento**
- [X] **Uso de flexbox em CSS**

### Web APIs

- [X] **Uso de seletores de DOM**
- [X] **Manipulação de eventos de DOM (listeners, propagação, delegação)**
- [X] **Manipulação dinâmica de DOM**
- [X] **Routing (History API, evento hashchange, window.location)**

### JavaScript

- [X] **Arrays (arranjos)**
- [X] **Objetos (key, value)**
- [X] **Diferenciar entre tipos de dados primitivos e não primitivos**
- [X] **Variáveis (declaração, atribuição, escopo)**
- [x] **Uso de condicionais (if-else, switch, operador ternário, lógica booleana)**
- [x] **Funções (params, args, return)**
- [x] **Testes unitários (unit tests)**
- [x] **Uso de mocks e espiões**
- [x] **Módulos de ECMAScript (ES modules)**
- [x] **Uso de linter (ESLINT)**
- [x] **Uso de identificadores descritivos (Nomenclatura e Semântica)**
- [x] **Diferença entre expressões (expressions) e declarações (statements)**
- [x] **Callbacks**
- [x] **Promessas**



### Controle de Versões (Git e GitHub)

- [x] **Git: Instalação e configuração**
- [x] **Git: Controle de versão com git (init, clone, add, commit, status, push, pull, remote)**
- [x] **Git: Integração de mudanças entre ramos (branch, checkout, fetch, merge, reset, rebase, tag)**
- [x] **GitHub: Criação de contas e repositórios, configuração de chave SSH**
- [x] **GitHub: Implantação com GitHub Pages**
- [x] **GitHub: Colaboração pelo Github (branches | forks | pull requests | code review)**


### Firebase

- [x] **Firebase Auth**
- [x] **Firestore**

### 3. Histórias de usuário

**Foi feita uma pesquisa pelo Google Forms para obter informações do que os usuários precisavam para o site e selecionamos as opções mais relevantes e que estavam ao nosso alcance para entregar os melhor para os usuários.**

![Captura de tela 2023-08-11 122950](https://github.com/amandascam03/SAP010-social-network/assets/131325234/361705e3-350d-493f-b55a-abb24dd02f13)
![Captura de tela 2023-08-11 122950](https://github.com/amandascam03/SAP010-social-network/assets/131325234/c663a19f-1699-4613-a47d-fa2b8554be55)
![Captura de tela 2023-08-11 123014](https://github.com/amandascam03/SAP010-social-network/assets/131325234/8eab028d-cc75-4675-953e-b5a21b2d27da)
![Captura de tela 2023-08-11 123130](https://github.com/amandascam03/SAP010-social-network/assets/131325234/6db11872-5a40-4d8d-9dfd-579af290feeb)


**Para organizar as histórias de usuário, utilizamos o Trello.**

**História 1: Eu como interessado na proposta do app quero me cadastrar com uma nova conta para obter uma conta de usuário.**

**História 2: Eu como usuário registrado quero fazer o login para acessar o feed.**

**História 3: Eu como usuário já registrado no app, após realizar o login quero interagir com outros usuários para obter e compartilhar conhecimento em defesa pessoal.**

**Todas as nossas histórias de usuário incluem:**
  - SPA.
  -  _responsividade_.
  -  _tests_ unitários.
  - Testes manuais buscando erros e imperfeições simples.
  - Testes de usabilidade.

#### 4. Testes unitários

* Os testes de unidade cobriram no mínimo 70% de _statements_, _functions_,
  _lines_ e _branches_.

  ## 5. Considerações gerais

* Este projeto foi desenvolvido em dupla.

* A lógica do projeto foi implementada completamente em JavaScript
  (ES6+), HTML e CSS :smiley:. Para este projeto não foi permitido o uso de
  _frameworks_ ou bibliotecas de CSS e JS.

  
