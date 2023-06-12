import renderFeed from "../Feed/feed";
import renderLogin from "../Login/login";
// aqui exportaras las funciones que necesites

export const myFunction = () => {
  // aqui tu codigo
  console.log("Hola mundo!");
  const isLoggedIn = false;
  if (!isLoggedIn) {
    return renderLogin();
  }
  return renderFeed();
};
