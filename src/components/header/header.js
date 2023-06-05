import { BODY } from '../../constants/constants';
import { winners } from '../winners/winners';

class Header {
  render() {
    const header = document.createElement('header');
    const views = ['to_garage', 'to_winners'];
    const fragment = new DocumentFragment();

    const toGarageBtn = document.createElement('button');
    toGarageBtn.classList.add('btn', 'to_garage');
    toGarageBtn.type = 'button';
    toGarageBtn.textContent = 'to_garage';
    toGarageBtn.addEventListener('click', winners.hide);
    fragment.append(toGarageBtn);

    const toWinnersBtn = document.createElement('button');
    toWinnersBtn.classList.add('btn', 'to_winners');
    toWinnersBtn.type = 'button';
    toWinnersBtn.textContent = 'to_winners';
    toWinnersBtn.addEventListener('click', winners.display);
    fragment.append(toWinnersBtn);

    header.append(fragment);
    const title = document.createElement('h1');
    title.textContent = 'async-race';
    header.append(title);
    return header;
  }
}
export const header = new Header();
