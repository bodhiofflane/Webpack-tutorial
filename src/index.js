import './styles/main.scss';

const foo = (name) => {
  console.log(`Hello ${name}`);
};

foo('Bo');

const elem = document.createElement('div');
elem.classList.add('bg-teal-300');

const body = document.body.append(elem);