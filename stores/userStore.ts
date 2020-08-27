import { observable, action, computed } from 'mobx';
import firebase from 'firebase/app';

import 'firebase/auth';
import { createNewLovelinus, getLovelinus, ILovelinusData } from '~/database/users';

const provider = new firebase.auth.GoogleAuthProvider();

export interface IUserStore {
  user: firebase.User | null;
  lovelinusData: ILovelinusData | null;

  initialized: boolean;

  auth: (user: firebase.User | null) => void;
  signIn: () => Promise<void>;
  signOut: () => void;

  isLoading: boolean;
  isAuthenticated: boolean;
}

class UserStore {
  @observable
  user: IUserStore['user'] = null;

  @observable
  lovelinusData: ILovelinusData | null = null;

  @observable
  initialized: IUserStore['initialized'] = false;

  @action
  auth(user: firebase.User | null) {
    this.user = user;

    if (user) {
      getLovelinus(user.uid).then(lovelinus => {
        this.lovelinusData = {
          displayName: user?.displayName,
          email: user?.email,
          photoURL: user?.photoURL,
          uid: user?.uid,
          admin: lovelinus.admin,
        };
      });
      this.initialized = true;
    }
  }

  @action
  signIn() {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(credential => {
        const { user, additionalUserInfo } = credential;
        if (!user) return;

        this.lovelinusData = {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid,
          admin: false,
        };

        if (additionalUserInfo?.isNewUser) {
          createNewLovelinus({
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            uid: user.uid,
            admin: false,
          });
        } else {
          getLovelinus(user.uid).then(lovelinus => {
            console.log(lovelinus);
            this.lovelinusData!.admin = lovelinus.admin;
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
}

export default new UserStore();
