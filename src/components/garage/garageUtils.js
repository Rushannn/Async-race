import { renderPage } from '../..';
import { CARS_PER_GARAGE_PAGE } from '../../constants/constants';
import { state } from '../../state/state';
import { serverApiUtil } from '../../utils/serverApiUtil';
import { utils } from '../../utils/utils';
import { winners } from '../winners/winners';
import { garage } from './garage';

class GarageUtils {
  getRandomCar() {
    const carCompanys = ['Ford', 'Mazda', 'Toyota', 'Lada', 'BMW', 'Porsche', 'Peugeot', 'Renault', 'Volkswagen'];
    const carModels = ['Focus', 'RX - 7', 'Prado', 'Prius', 'Yaris', 'x5', 'x6', 'Granta', 'Passat', 'Golf', 'Tiguan', 'Clio', 'Megane', 'Captur', 'Panamera', 'Taycan'];
    const name = `${utils.getRandomElement(carCompanys)} ${utils.getRandomElement(carModels)}`;
    const color = utils.getRandomColor();
    return { name, color };
  }

  async createCar(amount, getBody) {
    for (let i = 0; i < amount; i++) {
      const { name, color } = getBody();
      serverApiUtil.createCar(name, color);
    }
    state.cars = await serverApiUtil.getCars();
    renderPage();
  }

  selectCar(id, name, color) {
    document.querySelector('.update__car-name').value = name;
    document.querySelector('.update__car-color').value = color;
    document.querySelector('.update__car-btn').disabled = false;
    document.querySelector('.update__car-btn').setAttribute('data-id-selected-car', id);
  };

  async updateCar(id, name, color) {
    serverApiUtil.updateCar(id, name, color);
    state.cars = await serverApiUtil.getCars();
    renderPage();
    document.querySelector('.update__car-btn').disabled = true;
  };

  async removeCar(id) {
    serverApiUtil.removeCar(id);
    state.cars = await serverApiUtil.getCars();
    renderPage();
  };

  async turnPage(direction) {
    direction === 'next' ? state.currentPage++ : state.currentPage--;
    renderPage();
  };

  checkPagBtn() {
    const prevButton = document.querySelector('.garage__prev-button');
    const nextButton = document.querySelector('.garage__next-button');
    const isLastPage = state.currentPage >= Math.ceil(state.cars.count / CARS_PER_GARAGE_PAGE)
    prevButton.disabled = state.currentPage === 1 ? true : false;
    nextButton.disabled = isLastPage ? true : false;
  }

  animationRace(id, time, distance) {
    const car = document.querySelector(`.race-car-${id}`);
    let startAnimation = null;
    requestAnimationFrame(function measure(timeStamp) {
      if (!state.carStopped[id]) {
        if (!startAnimation) { startAnimation = timeStamp; }
        const progress = (timeStamp - startAnimation) / time;
        const translate = progress * distance;
        car.style.transform = `translateX(${translate}px)`;
        if (progress < 1) {
          requestAnimationFrame(measure);
        }
      }
    });
  }

  async startCar(id, name = '') {
    const startBtn = document.querySelector(`.btn-start-${id}`);
    const stopBtn = document.querySelector(`.btn-stop-${id}`);
    startBtn.disabled = true;
    stopBtn.disabled = false;
    const res = await serverApiUtil.startCar(id);
    const time = res.distance / res.velocity;
    const distance = window.innerWidth - 150;
    state.carStopped[id] = false;
    this.animationRace(id, time, distance);
    const success = await serverApiUtil.startDrive(id);
    if (!success) {
      state.carStopped[id] = true;
      throw Error();
    }

    return { name, id, time: +(time / 1000).toFixed(2) };
  }

  async stopCar(id) {
    const startBtn = document.querySelector(`.btn-start-${id}`);
    const stopBtn = document.querySelector(`.btn-stop-${id}`);
    state.carStopped[id] = true;
    await serverApiUtil.stopCar(id);
    const car = document.querySelector(`.race-car-${id}`);
    car.style.transform = 'translateX(0px)';
    startBtn.disabled = false;
    stopBtn.disabled = true;
    return true;
  }

  async raceCars() {
    const raceBtn = document.querySelector('.btn-race');
    const resetBtn = document.querySelector('.btn-reset');
    resetBtn.disabled = false;
    raceBtn.disabled = true;
    const results = state.cars.items.map(({ id, name }) => this.startCar(id, name));
    Promise.any(results).then(({ time, id, name }) => {
      garage.showWinnerPopup(name, time);
      this.setWinner(id, time);
    });
  }

  resetCars() {
    const raceBtn = document.querySelector('.btn-race');
    const resetBtn = document.querySelector('.btn-reset');
    resetBtn.disabled = true;

    const stoppedCars = state.cars.items.map(({ id }) => this.stopCar(id));
    Promise.allSettled(stoppedCars).then((results) => raceBtn.disabled = false);
  }

  async setWinner(id, time) {
    const requestWinner = await serverApiUtil.getWinner(id);
    if (requestWinner.ok) {
      const wins = requestWinner.items.wins + 1;
      const bestTime = Math.min(time, requestWinner.items.time);
      await serverApiUtil.updateWinner(id, bestTime, wins);
    } else {
      await serverApiUtil.createWinner(id, time);
    }
    state.winners = await serverApiUtil.getWinners(state.winnersPage);
    await winners.updateWinnersTable();
  }
}

export const garageUtils = new GarageUtils();
