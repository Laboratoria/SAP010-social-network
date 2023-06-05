import login from "./pages/login/login.js";
import register from "./pages/register/register.js";
import timeline from "./pages/timeline/timeline.js";

const main = document.querySelector("#root");

const renderPage = () => {
  main.innerHTML = "";
  const hash = window.location.hash;

  switch (hash) {
    case "#register":
      main.appendChild(register());
      break;
    case "#timeline":
      main.appendChild(timeline());
      break;
    default:
      main.appendChild(login());
      break;
  }
};

window.addEventListener("hashchange", renderPage);

window.addEventListener("load", () => {
  if (window.location.hash === "#register") {
    main.appendChild(register());
  } else if (window.location.hash === "#timeline") {
    main.appendChild(timeline());
  } else {
    main.appendChild(login());
  }
});
