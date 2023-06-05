import { garageUtils } from '../garage/garageUtils';
import { carSvg } from './carSvg';

class Cars {
  render(name, color, id) {
    const car = document.createElement('div');
    car.classList.add('car');
    car.setAttribute('data-id', id);

    const carOptions = document.createElement('div');
    carOptions.classList.add('car__options');
    car.append(carOptions);

    const btnSelect = document.createElement('button');
    btnSelect.classList.add('btn-options', 'btn-select');
    btnSelect.type = 'button';
    btnSelect.textContent = 'select';
    carOptions.append(btnSelect);
    btnSelect.addEventListener('click', () => {
      garageUtils.selectCar(id, name, color);
    });

    const btnRemove = document.createElement('button');
    btnRemove.classList.add('btn-options', 'btn-remove');
    btnRemove.type = 'button';
    btnRemove.textContent = 'remove';
    carOptions.append(btnRemove);
    btnRemove.addEventListener('click', () => {
      garageUtils.removeCar(id);
    });

    const carControl = document.createElement('div');
    carControl.classList.add('car__control');
    car.append(carControl);

    const btnStart = document.createElement('button');
    btnStart.classList.add('btn-control', `btn-start-${id}`);
    btnStart.type = 'button';
    btnStart.textContent = 'start';
    carControl.append(btnStart);
    btnStart.addEventListener('click', async () => {
      garageUtils.startCar(id);
    });

    const btnStop = document.createElement('button');
    btnStop.classList.add('btn-control', `btn-stop-${id}`);
    btnStop.type = 'button';
    btnStop.textContent = 'stop';
    btnStop.disabled = true;
    carControl.append(btnStop);
    btnStop.addEventListener('click', async () => {
      garageUtils.stopCar(id);
    });

    const carName = document.createElement('span');
    carName.classList.add('car__name');
    carName.textContent = name;
    carName.style.padding = '20px';
    carControl.append(carName);

    const carContayner = document.createElement('div');
    carContayner.classList.add('car__contayner');
    car.append(carContayner);

    const raceCar = document.createElement('div');
    raceCar.classList.add('race-car', `race-car-${id}`);
    raceCar.innerHTML = this.getCarSvg(color);
    carContayner.append(raceCar);
    return car;
  }

  getCarSvg(color) {
    const carHtml = carSvg.getCar(color);
    return carHtml;
  }
}

export const cars = new Cars();
