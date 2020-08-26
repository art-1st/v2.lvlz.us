import { observable, action } from 'mobx';
import Calendar from 'tui-calendar';

export interface IStore {
  state: boolean;
  calendarRef: Calendar | null;

  setState: (state: boolean) => void;
  registerCalendarRef: (calendarRef: Calendar) => void;
}

class Store {
  @observable
  state: boolean = false;

  calendarRef = null;

  @action
  setState(state: boolean) {
    this.state = state;
  }

  @action
  registerCalendarRef(calendarRef: Calendar) {
    this.calendarRef = calendarRef as any;
  }
}

export default new Store();
