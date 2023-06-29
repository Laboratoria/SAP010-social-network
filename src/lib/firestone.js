import { getAuth } from "firebase/auth";
import { app, auth } from "./firebase.js";

import {
    collection,
    getFirestore,
    getDocs,
    addDoc,
    getDoc,
    doc,
    updateDoc,
    deleteDoc
} from "firebase/firestore";


const db = getFirestore(app);

//criar post no banco de dados

export const criarPost = async (textPost) => {
    const auth = getAuth(app);


    const docRef = await addDoc(collection(db, 'post'), {
        name: auth.currentUser.displayName,
        author: auth.currentUser.uid,
        texto: textPost,
        like: [],

    });

    return docRef;

};

//carrega post por ordem

export const pegarPost = async () => {
    const querySnapshot = await getDocs(collection(db, 'post'));
    const postArray = [];
    querySnapshot.forEach((post) => {
        postArray.push({ ...post.data(), id: post.id });

    });

    return postArray
};

// likes



export const likePost = async (db,  postId, userId) => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('Usuário não está logado');
    }
  
    const postRef = doc(db, 'post', postId);
    const postSnap = await getDoc(postRef);
    const postData = postSnap.data();
    
  
    const isLiked = postData.like.includes(userId);
  
    const updatedLikeArray = isLiked
      ? postData.like.filter((id) => id !== userId)
      : [...postData.like, userId];
  
    await updateDoc(postRef, { like: updatedLikeArray });
};

export const deletarPost = async (idPost) => {
    const deletPost = await deleteDoc(doc(db, 'post', idPost));
    return deletPost;
    
}