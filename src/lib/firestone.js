import { getAuth } from "firebase/auth";
import { app } from "./firebase.js";

import {
    collection,
    getFirestore,
    getDocs,
    addDoc,
    getDoc
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

export const getPostById = async (postID) => {
    const docRef = doc(db, 'posts', postID);
    const docSnap = await getDoc(docRef);
    return docSnap.data().like.length;
};

export const likePost = async (postId, userId) => {
    const post = await getPostById(postId);
    let likes = post.like;
    const liking = !likes.includes(userId);
    if (liking) {
        likes.push(userId);
    } else {
        likes = likes.filter((id) => id !== userId);
    }
    return updateDoc(doc(db, 'posts', postId), {
        like: likes,
    });
};