import './feed.css';

export const feedUser = () => {
  const container = document.createElement('div');

  const template = `
  <h1>feed</h1>
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
