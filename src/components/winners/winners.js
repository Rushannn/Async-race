import { CARS_PER_WINNERS_PAGE } from '../../constants/constants';
import { state } from '../../state/state';
import { serverApiUtil } from '../../utils/serverApiUtil';
import { cars } from '../cars/cars';

class Winners {
  async render() {
    const winners = document.createElement('div');
    winners.classList.add('winners');

    winners.append(this.getWinnersHeader());

    const winnersTable = document.createElement('table');
    winnersTable.classList.add('winners__table', 'table');
    winners.append(winnersTable);

    winnersTable.append(this.getWinnersTabHead());
    winnersTable.append(await this.getWinnersBody());

    winners.append(this.getPaginationBtns());
    return winners;
  }

  getWinnersHeader() {
    const winnersHeader = document.createElement('div');
    winnersHeader.classList.add('winners__header');

    const winnersTitle = document.createElement('h3');
    winnersTitle.classList.add('winners__title');
    winnersTitle.textContent = `winners (${state.winners.count})`;
    winnersHeader.append(winnersTitle);

    const winnersPage = document.createElement('h3');
    winnersPage.classList.add('garage__page');
    winnersPage.textContent = `page ${state.winnersPage}`;
    winnersHeader.append(winnersPage);

    return winnersHeader;
  }

  getWinnersTabHead() {
    const thead = document.createElement('thead');

    const tr = document.createElement('tr');
    thead.append(tr);

    const tableNumber = document.createElement('th');
    tableNumber.classList.add('table__number');
    tableNumber.textContent = '№';
    tr.append(tableNumber);

    const tableCar = document.createElement('th');
    tableCar.textContent = 'Car';
    tr.append(tableCar);

    const tableName = document.createElement('th');
    tableName.classList.add('table__name');
    tableName.textContent = 'Name';
    tr.append(tableName);

    const tableWins = document.createElement('th');
    tableWins.classList.add('table__wins');
    tableWins.textContent = 'Wins';
    tr.append(tableWins);

    const tableTime = document.createElement('th');
    tableTime.classList.add('table__time');
    tableTime.textContent = 'Best time (sec)';
    tr.append(tableTime);

    return thead;
  }

  getPaginationBtns() {
    const winnersPagination = document.createElement('div');
    winnersPagination.classList.add('winners__pagination');

    const prevBtn = document.createElement('button');
    prevBtn.classList = ('btn__pag', 'pag-prev-btn');
    prevBtn.type = 'button';
    prevBtn.textContent = 'prev';
    winnersPagination.append(prevBtn);
    prevBtn.addEventListener('click', () => {
      winners.turnPage('prev');
    });

    const nextBtn = document.createElement('button');
    nextBtn.classList = ('btn__pag', 'pag-next-btn');
    nextBtn.type = 'button';
    nextBtn.textContent = 'next';
    winnersPagination.append(nextBtn);
    nextBtn.addEventListener('click', () => {
      winners.turnPage('next');
    });
    return winnersPagination;
  }

  async getWinnersBody() {
    const tbody = document.createElement('tbody');
    tbody.classList.add('table-body');

    for (let index = 0; index < state.winners.items.length; index++) {
      const { id } = state.winners.items[index];
      const { wins } = state.winners.items[index];
      const { time } = state.winners.items[index];
      const fragment = await this.getwinnersRow(id, wins, time, index);
      tbody.append(fragment);
    }
    return tbody;
  }

  async getwinnersRow(id, wins, time, index) {
    const car = await this.getCarById(id);

    const winnersRow = document.createElement('tr');

    const rowIndex = document.createElement('td');
    rowIndex.textContent = (state.winnersPage - 1) * CARS_PER_WINNERS_PAGE + index + 1;
    winnersRow.append(rowIndex);

    const rowCar = document.createElement('td');
    rowCar.innerHTML = cars.getCarSvg(car.color);
    winnersRow.append(rowCar);

    const rowCarName = document.createElement('td');
    rowCarName.textContent = car.name;
    winnersRow.append(rowCarName);

    const rowCarWins = document.createElement('td');
    rowCarWins.textContent = wins;
    winnersRow.append(rowCarWins);

    const rowCarBestTime = document.createElement('td');
    rowCarBestTime.textContent = time;
    winnersRow.append(rowCarBestTime);

    return winnersRow;
  }

  async updateWinnersTable() {
    const winnersHeader = document.querySelector('.winners__header');
    const newWinnersHeader = this.getWinnersHeader();
    winnersHeader.replaceWith(newWinnersHeader);
    const tableBody = document.querySelector('.table-body');
    const newBody = await this.getWinnersBody();
    tableBody.replaceWith(newBody);
    this.checkPagBtn();
  }

  checkPagBtn() {
    const prevButton = document.querySelector('.pag-prev-btn');
    const nextButton = document.querySelector('.pag-next-btn');
    const isLastPage = state.winnersPage >= Math.ceil(state.winners.count / CARS_PER_WINNERS_PAGE)
    prevButton.disabled = state.winnersPage === 1 ? true : false;
    nextButton.disabled = isLastPage ? true : false;
  }

  async getCarById(id) {
    const { data: { color, name } } = await serverApiUtil.getCar(id);
    return { color, name };
  }

  async turnPage(direction) {
    direction === 'next' ? state.winnersPage++ : state.winnersPage--;
    state.winners = await serverApiUtil.getWinners(state.winnersPage);
    this.updateWinnersTable();
  }

  display() {
    document.querySelector('.winners').style.display = 'block';
    document.querySelector('.garage').style.display = 'none';
  }

  hide() {
    document.querySelector('.winners').style.display = 'none';
    document.querySelector('.garage').style.display = 'block';
  }
}

export const winners = new Winners();
