import { observable } from 'mobx';

export interface IUserStore {
  idToken: string | null;
}

class UserStore {
  @observable
  idToken: string | null = null;
}

export default new UserStore();
