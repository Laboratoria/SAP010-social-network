import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import firebase from 'firebase/compat/app';
import { app } from './app.js';

export const storage = getStorage(app);

export const uploadProfilePhoto = (file) => {
  const userId = firebase.auth().currentUser.uid;
  const storageRef = ref(storage, `profilePhotos/${userId}/${file.name}`);

  return uploadBytes(storageRef, file)
    .then(() => getDownloadURL(storageRef))
    .catch((error) => {
      console.log('Erro ao fazer upload da foto de perfil:', error);
      throw error;
    });
};
