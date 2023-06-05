import { BODY } from '../../constants/constants';
import { state } from '../../state/state';
import { serverApiUtil } from '../../utils/serverApiUtil';
import { cars } from '../cars/cars';
import { garageUtils } from './garageUtils';

export class Garage {
  getCarCreater() {
    const carAmount = 1;
    const createCar = document.createElement('div');
    createCar.classList.add('options__create-car');

    const carName = document.createElement('input');
    carName.classList.add('create__car-name', 'input-text');
    carName.type = 'text';
    createCar.append(carName);

    const carColor = document.createElement('input');
    carColor.classList.add('car-color', 'input-color');
    carColor.type = 'color';
    createCar.append(carColor);

    const createCarBtn = document.createElement('button');
    createCarBtn.classList.add('create__car-btn', 'btn');
    createCarBtn.type = 'button';
    createCarBtn.textContent = 'create';
    createCar.append(createCarBtn);

    createCarBtn.addEventListener('click', () => {
      garageUtils.createCar(carAmount, () => { return { name: carName.value, color: carColor.value } });
    });
    return createCar;
  }

  getUpdateCarOption() {
    const updateCar = document.createElement('div');
    updateCar.classList.add('options__update-car');

    const updateCarName = document.createElement('input');
    updateCarName.classList.add('update__car-name', 'input-text');
    updateCarName.type = 'text';
    updateCar.append(updateCarName);

    const updateCarColor = document.createElement('input');
    updateCarColor.classList.add('update__car-color', 'input-color');
    updateCarColor.type = 'color';
    updateCar.append(updateCarColor);

    const updateCarBtn = document.createElement('button');
    updateCarBtn.classList.add('update__car-btn', 'btn');
    updateCarBtn.type = 'button';
    updateCarBtn.disabled = true;
    updateCarBtn.textContent = 'update';
    updateCarBtn.addEventListener('click', () => {
      garageUtils.updateCar(updateCarBtn.dataset.idSelectedCar, updateCarName.value, updateCarColor.value);
    });
    updateCar.append(updateCarBtn);
    return updateCar;
  }

  getRaceControllBtns() {
    const carsAmount = 100;
    const optionsRaceControls = document.createElement('div');
    optionsRaceControls.classList.add('options__race-controls');

    const raceBtn = document.createElement('button');
    raceBtn.classList.add('btn-ctrl', 'btn-race');
    raceBtn.type = 'button';
    raceBtn.textContent = 'race';
    optionsRaceControls.append(raceBtn);
    raceBtn.addEventListener('click', () => { garageUtils.raceCars(); });

    const resetBtn = document.createElement('button');
    resetBtn.classList.add('btn-ctrl', 'btn-reset');
    resetBtn.type = 'button';
    resetBtn.textContent = 'reset';
    resetBtn.disabled = true;
    optionsRaceControls.append(resetBtn);
    resetBtn.addEventListener('click', () => { garageUtils.resetCars(); });

    const createCarsBtn = document.createElement('button');
    createCarsBtn.classList.add('btn-ctrl', 'btn-generate_cars');
    createCarsBtn.type = 'button';
    createCarsBtn.textContent = 'generate_cars';
    optionsRaceControls.append(createCarsBtn);
    createCarsBtn.addEventListener('click', () => garageUtils.createCar(carsAmount, garageUtils.getRandomCar));
    return optionsRaceControls;
  }

  getGarageHeader(page, count) {
    const garageHeader = document.createElement('div');
    garageHeader.classList.add('garage__header');

    const title = document.createElement('h3');
    title.classList.add('garage-title');
    title.textContent = `garage(${count})`;
    garageHeader.append(title);

    const garagePpage = document.createElement('h3');
    garagePpage.classList.add('garage__page');
    garagePpage.textContent = `page ${page}`;
    garageHeader.append(garagePpage);

    return garageHeader;
  }

  getPaginationBtns() {
    const garagePagination = document.createElement('div');
    garagePagination.classList.add('garage__pagination');

    const garagePrevBtn = document.createElement('button');
    garagePrevBtn.classList.add('garage__prev-button', 'pag-btn');
    garagePrevBtn.type = 'button';
    garagePrevBtn.textContent = 'prev';
    garagePrevBtn.disabled = true;
    garagePagination.append(garagePrevBtn);
    garagePrevBtn.addEventListener('click', () => {
      garageUtils.turnPage('prev');
    });

    const garageNextBtn = document.createElement('button');
    garageNextBtn.classList.add('garage__next-button', 'pag-btn');
    garageNextBtn.type = 'button';
    garageNextBtn.textContent = 'next';
    garageNextBtn.disabled = false;
    garagePagination.append(garageNextBtn);
    garageNextBtn.addEventListener('click', () => {
      garageUtils.turnPage('next');
    });

    return garagePagination;
  }

  render(page, count) {
    const garage = document.createElement('div');
    garage.classList.add('garage');

    const garageOptions = document.createElement('div');
    garageOptions.classList.add('garage__options');
    garage.append(garageOptions);

    const optionsWrapper = document.createElement('div');
    optionsWrapper.classList.add('options__wrapper');
    garageOptions.append(optionsWrapper);

    optionsWrapper.append(this.getCarCreater());
    optionsWrapper.append(this.getUpdateCarOption());
    optionsWrapper.append(this.getRaceControllBtns());
    garage.append(this.getGarageHeader(page, count));

    state.cars.items.forEach(({ name, color, id }) => {
      garage.append(cars.render(name, color, id));
    });
    garage.append(this.getPaginationBtns());
    return garage;
  }

  showWinnerPopup(name, time) {
    const popupWinner = document.createElement('div');
    popupWinner.classList.add('popup-winner');

    const winnerHeader = document.createElement('h2');
    winnerHeader.classList.add('winner__header');
    winnerHeader.textContent = 'Winner!';
    popupWinner.append(winnerHeader);

    const winnerName = document.createElement('h2');
    winnerName.textContent = name;
    popupWinner.append(winnerName);

    const winnerTime = document.createElement('h2');
    winnerTime.textContent = time;
    popupWinner.append(winnerTime);
    BODY.append(popupWinner);

    const removePopup = () => {
      setTimeout(() => {
        popupWinner.remove();
      }, 5000);
    };
    removePopup();
  }
}
export const garage = new Garage();
