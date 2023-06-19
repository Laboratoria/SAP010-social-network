export default () => {
  const container = document.createElement('div');

  const template = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <h1>TEla de Feed</h1>
    </head>
    
    <body>
        <h1>TEla de Feed</h1>
    </body>
    </html>`;

  container.innerHTML = template;
  return container;
};
