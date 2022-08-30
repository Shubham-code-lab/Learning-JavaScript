'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const list = document.querySelectorAll('.show-modal');
const btnX = document.querySelector('.close-modal');

const CloseWindow = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

const showWindow = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

for (let i = 0; i < list.length; i++)
  list[i].addEventListener('click', showWindow);

btnX.addEventListener('click', CloseWindow);
overlay.addEventListener('click', CloseWindow);

//no bracket as we don't want to called function

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
    CloseWindow();
  }
});
