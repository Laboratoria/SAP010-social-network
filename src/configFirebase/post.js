
import { collection, db, addDoc } from "../configFirebase/configFirebase.js";


//criar postagem de usuarios/ id automatico 
export const publicações = async (Post) => {
  const auth = getAppAuth();

  const document = await addDoc (collection(db, 'Post'), {
    name: auth.currentUser.displayName,
    author: auth.currentUser.uid,
    msg: Post.msg,
    likes: [],
  });
  return document;
}  