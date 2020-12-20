import Counter from './classes';

const counterElement = document.querySelectorAll('.counter');

counterElement.forEach((element) => {
  const counter = new Counter(element);
  counter._init();
});
