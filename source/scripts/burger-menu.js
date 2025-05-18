import {
  mainHeader,
  burger
} from './dom-elements';

const onBurgerClick = () => {
  mainHeader.classList.toggle('main-header--nav-is-opened');
};

burger.addEventListener('click', onBurgerClick);
