import { observable, action } from 'mobx';

export interface IStore {
  state: boolean;
  setState: (state: boolean) => void;
}

class Store {
  @observable
  state: boolean = false;

  @action
  setState(state: boolean) {
    this.state = state;
  }
}

export default new Store();
