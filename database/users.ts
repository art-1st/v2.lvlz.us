import firebase from 'firebase/app';
import 'firebase/database';

interface ILovelinusData {
  name: string | null;
  email: string | null;
  photoURL: string | null;
  uid: string | null;
}

export function createNewLovelinus(user: ILovelinusData) {
  const database = firebase.database();
  const { name, email, photoURL, uid } = user;

  database.ref(`/lovelinus/${uid}`).set({
    name,
    email,
    photoURL,
    uid,
  });
}
