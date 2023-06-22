export default (message) => {
  const customAlert = document.createElement("div");
  customAlert.classList.add('customAlert')
  customAlert.innerText = message;

  const body = document.querySelector('body')
  body.appendChild(customAlert);
  
  setTimeout(function() {
    body.removeChild(customAlert)
  }, 3000); // 3000 milissegundos = 3 segundos
}