export const feedUser = () => {
  const container = document.createElement('div');

  const template = `
    <h1>Feed</h1>
`;

  container.innerHTML = template;
  return container;
};

// const main = async () => {
//   const root = document.querySelector('#root');
//   root.innerHTML = template;
// }

// export default main;
