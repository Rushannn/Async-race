import './index.html';
import './index.css';
import './components/cars/cars.css';
import './components/header/header.css';
import './components/winners/winners.css';
import './components/garage/garage.css';
import { header } from './components/header/header';
import { garage } from './components/garage/garage';
import { winners } from './components/winners/winners';
import { state } from './state/state';
import { BODY } from './constants/constants';
import { serverApiUtil } from './utils/serverApiUtil';
import { garageUtils } from './components/garage/garageUtils';

export const renderPage = async () => {
  state.cars = await serverApiUtil.getCars(state.currentPage);
  state.winners = await serverApiUtil.getWinners(state.winnersPage);
  BODY.innerHTML = '';
  BODY.append(header.render());
  BODY.append(garage.render(state.currentPage, state.cars.count));
  BODY.append(await winners.render());
  garageUtils.checkPagBtn();
  winners.checkPagBtn();
};
renderPage();


state.cars = await serverApiUtil.getCars(state.currentPage);
console.log(state.cars)
