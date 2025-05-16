import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

function getIziToastOptions({ message, color }) {
  return ({
    message,
    messageColor: 'white',
    position: 'topRight',
    timeout: 3000,
    color,
    progressBar: false,
  });
}

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}

form.addEventListener('submit', event => {
  event.preventDefault();

  const delay = Number(form.elements.delay.value);
  const state = form.elements.state.value;

  createPromise(delay, state)
    .then(delay => {
      iziToast.show(getIziToastOptions({
        message: `<i class="fa-solid fa-check"></i> Fulfilled promise in ${delay}ms`,
        color: '#008000',
      }));
    })
    .catch(delay => {
      iziToast.show(getIziToastOptions({
        message: `<i class="fa-solid fa-circle-exclamation"></i> Rejected promise in ${delay}ms`,
        color: '#FF0000',
      }));
    });

  form.reset();
});