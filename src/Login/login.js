import template from "./login.html?raw";

const scripts = () => {
  const newAccount = document.querySelector("#newAccount");

  newAccount.onclick = () => {
    const register = document.querySelector("#register");
    register.classList.add("show");

    const login = document.querySelector("#login");
    login.classList.remove("show");
  };

  const signup = document.querySelector("#signup");

  signup.onclick = () => {
    const register = document.querySelector("#register");
    register.classList.remove("show");

    const login = document.querySelector("#login");
    login.classList.add("show");
  };
};

const main = async () => {
  const root = document.querySelector("#root");
  root.innerHTML = template;
  scripts();
};

export default main;
