/* eslint-disable no-unused-expressions */

class State {
  constructor() {
    this.currentPage = 1;
    this.cars = {
      items: [],
      count: '',
    };
    this.winnersPage = 1;
    this.carStopped = {};
    this.winners = {
      items: [],
      count: '',
    };
    this.sortBy = null;
    this.sortOrder = null;
  }
}

export const state = new State();
// state.cars = await serverApiUtil.getCars(state.currentPage);
// state.winners = await serverApiUtil.getWinners(state.winnersPage);
