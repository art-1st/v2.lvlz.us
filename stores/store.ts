import { observable, action } from 'mobx';
import Calendar from 'tui-calendar';

export interface IStore {
  state: boolean;
  calendarRef: Calendar | null;
  cachedMonth: number[];

  setState: (state: boolean) => void;
  registerCalendarRef: (calendarRef: Calendar) => void;
  addCachedMonth: (month: number) => void;
  clearCachedMonth: () => void;
}

class Store {
  @observable
  state: boolean = false;

  calendarRef: Calendar | null = null;

  @observable
  cachedMonth: number[] = [];

  @action
  setState(state: boolean) {
    this.state = state;
  }

  @action
  registerCalendarRef(calendarRef: Calendar) {
    this.calendarRef = calendarRef as any;
  }

  @action
  addCachedMonth(month: number) {
    this.cachedMonth.push(month);
  }

  @action
  clearCachedMonth() {
    this.cachedMonth = [];
  }
}

export default new Store();
