import { observable, action, computed } from 'mobx';
import firebase from 'firebase/app';

import 'firebase/auth';
import { createNewLovelinus, getLovelinus, ILovelinusData } from '~/database/users';

const provider = new firebase.auth.GoogleAuthProvider();

export interface IUserStore {
  user: firebase.User | null;
  lovelinusData: ILovelinusData | null;
  initialized: boolean;
  onAuthProgress: boolean;

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

  @observable
  onAuthProgress: IUserStore['onAuthProgress'] = false;

  @action
  async auth(user: firebase.User | null) {
    this.user = user;

    if (user) {
      const lovelinus = await getLovelinus(user.uid);

      this.lovelinusData = {
        displayName: user?.displayName,
        email: user?.email,
        photoURL: user?.photoURL,
        uid: user?.uid,
        admin: lovelinus.admin,
      };
    }

    this.initialized = true;
  }

  @action
  signIn() {
    this.onAuthProgress = true;

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
            this.lovelinusData!.admin = lovelinus.admin;
          });
        }

        this.onAuthProgress = false;
      })
      .catch(error => {
        this.onAuthProgress = false;
        console.error(error);
      });
  }

  @action
  async signOut(): Promise<void> {
    await firebase
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
    return !this.initialized || this.onAuthProgress;
  }

  @computed
  get isAuthenticated(): boolean {
    return this.user !== null && this.lovelinusData !== null && this.initialized;
  }
}

export default new UserStore();
