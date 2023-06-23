import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getUserId } from './auth.js';
import { storage, db } from './app.js';

export const uploadProfileImage = async (file) => {
  try {
    const storageRef = ref(storage, `profile/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error('Erro ao enviar a imagem:', error);
    throw error;
  }
};

export const updateProfileImageURL = async (imagePath) => {
  try {
    const userId = getUserId();
    const userRef = doc(db, 'users', userId);

    await updateDoc(userRef, {
      profileImageUrl: imagePath,
    });
  } catch (error) {
    console.error('Erro ao atualizar a URL da imagem do perfil:', error);
    throw error;
  }
};
