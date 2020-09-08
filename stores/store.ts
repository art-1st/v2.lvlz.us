import { observable } from 'mobx';

export interface IStore {
  state: boolean;
}

class Store {
  @observable
  state: boolean = false;
}

export default new Store();
