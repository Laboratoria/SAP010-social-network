
export const feed = () => {
    const container = document.createElement("div");
  
    const templateFeed = `
      

      <section class="feed-page">
        <p> Crie seu post aqui!</p>
        <a class="feedPage" href="/#feed"></a>
       
      </section>
      `;
  
    container.innerHTML = templateFeed;
  
    return container;
  };