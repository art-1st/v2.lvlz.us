import { observable, action, computed } from 'mobx';

export interface IStore {
  loadedDate: {
    start: Date;
    end: Date;
  };

  setLoadedDate: (start: Date, end: Date) => void;
  loadedStartDate: Date;
  loadedEndDate: Date;
}

const currentDate = new Date();

class Store {
  @observable
  loadedDate: IStore['loadedDate'] = {
    start: currentDate,
    end: currentDate,
  };

  @action
  setLoadedDate(start: Date, end: Date) {
    if (start < this.loadedDate.start) {
      this.loadedDate.start = start;
    }

    if (end > this.loadedDate.end) {
      this.loadedDate.end = end;
    }
  }

  @computed
  get loadedStartDate(): Date {
    return this.loadedDate.start;
  }

  @computed
  get loadedEndDate(): Date {
    return this.loadedDate.end;
  }
}

export default new Store();
