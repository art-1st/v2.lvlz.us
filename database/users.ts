import firebase from 'firebase/app';
import 'firebase/database';

export interface ILovelinusAuthData {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  uid: string | null;
}
export interface ILovelinusData extends ILovelinusAuthData {
  admin: boolean;
}

export function createNewLovelinus(user: ILovelinusData) {
  const database = firebase.database();
  const { displayName, email, photoURL, uid, admin } = user;

  database.ref(`/lovelinus/${uid}`).set({
    displayName,
    email,
    photoURL,
    uid,
    admin,
  });
}

export async function getLovelinus(uid: string): Promise<ILovelinusData> {
  const database = firebase.database();
  const snapshot = await database.ref(`/lovelinus/${uid}`).once('value');

  return snapshot.val();
}
