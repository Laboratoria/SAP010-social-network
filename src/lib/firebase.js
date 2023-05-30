import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyCAS54cKJAeG89RM6F7I4Z_FebhCmPi65o",
    authDomain: "social-network-5b868.firebaseapp.com",
    databaseURL: "https://social-network-5b868-default-rtdb.firebaseio.com",
    projectId: "social-network-5b868",
    storageBucket: "social-network-5b868.appspot.com",
    messagingSenderId: "515527831334",
    appId: "1:515527831334:web:85445b3610e84e7c56dbe7",
    measurementId: "G-TZ3QG03NVJ"
  };

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

// Get a list of cities from your database
/*export async function getCities(db) {
  const citiesCol = collection(db, 'cities');
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map(doc => doc.data());
  return cityList;
}*/