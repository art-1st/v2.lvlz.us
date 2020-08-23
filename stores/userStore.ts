import { observable, action, computed } from 'mobx';
import firebase from 'firebase/app';

import 'firebase/auth';
import { createNewLovelinus } from '~/database/users';

const provider = new firebase.auth.GoogleAuthProvider();

interface UserData {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  uid: string;
}

export interface IUserStore {
  user: firebase.User | null;
  initialized: boolean;

  auth: (user: firebase.User | null) => void;
  signIn: () => Promise<void>;
  signOut: () => void;

  isLoading: boolean;
  isAuthenticated: boolean;
  userData: UserData | null;
}

class UserStore {
  @observable
  user: IUserStore['user'] = null;

  @observable
  initialized: IUserStore['initialized'] = false;

  @action
  auth(user: firebase.User | null) {
    this.user = user;
    this.initialized = true;
  }

  @action
  signIn() {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(credential => {
        const { user, additionalUserInfo } = credential;

        if (additionalUserInfo?.isNewUser) {
          if (!user) return;

          createNewLovelinus({
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            uid: user.uid,
          });
        }
      });
  }

  @action
  async signOut(): Promise<void> {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.user = null;
        return;
      })
      .catch(error => {
        console.error(error);
        return;
      });
  }

  @computed
  get isLoading(): boolean {
    return !this.initialized;
  }

  @computed
  get isAuthenticated(): boolean {
    return this.user !== null && this.initialized;
  }

  @computed
  get userData(): UserData | null {
    if (!this.user) return null;
    const { displayName, email, photoURL, uid } = this.user;

    return {
      displayName,
      email,
      photoURL,
      uid,
    };
  }
}

export default new UserStore();
