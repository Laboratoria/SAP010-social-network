import { logOut } from "../../firebase/firebase";

export default () =>{
    const containerFeed = document.createElement("section");
    const templateFeed = `
    <h1> Olá </h1>
    <button class="btn-logout">Sair</button>
    `
    containerFeed.innerHTML = templateFeed;

    const btnLogOut = containerFeed.querySelector(".btn-logout");

    btnLogOut.addEventListener('click', async () => {
        try {

            await logOut();
            window.location.href = "#home";

        } catch(error) {
            
            console.log(error.message);
        }
    })

    return containerFeed;
}