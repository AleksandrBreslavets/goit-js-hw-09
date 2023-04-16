import Notiflix from 'notiflix';

const form = document.querySelector(".form");
form.addEventListener("submit", onSubmit);

function onSubmit(evt) {
  evt.preventDefault();
  const { delay, step, amount } = form.elements;
  let numOfDelay = Number(delay.value);
  const numOfSteps = Number(step.value);
  const amountNum = Number(amount.value);
  for (let i = 1; i <= amountNum; i++){
    createPromise(i, numOfDelay);
    numOfDelay += numOfSteps;
  }
}

function createPromise(position, delay) {
  setTimeout(() => {
    const shouldResolve = Math.random() > 0.3;
    const promise = new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
    } else {
      reject(`❌ Rejected promise ${position} in ${delay}ms`);
    }
    })
    promise.then(value => Notiflix.Notify.success(value)).catch(error => Notiflix.Notify.failure(error));
  }, delay);
}
