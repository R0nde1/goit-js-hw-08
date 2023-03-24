import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const CURRENTTEXT_KEY = 'feedback-form-state';
let dataset = {};

function onInputForm(evt) {
  dataset[evt.target.name] = evt.target.value;
  localStorage.setItem(CURRENTTEXT_KEY, JSON.stringify(dataset));
}

function onFormSubmit(evt) {
    evt.preventDefault();
    if (!dataset.email || !dataset.message) {
      alert('Будь ласка, заповніть всі поля форми');
      return;
    }
    evt.currentTarget.submit();
    evt.currentTarget.reset();
    localStorage.removeItem(CURRENTTEXT_KEY);
    console.log(dataset);
    dataset = {};
  }
  
  formEl.addEventListener('submit', onFormSubmit);
  
  

function inputAfterReload() {
  let savedData = localStorage.getItem(CURRENTTEXT_KEY);
  savedData = JSON.parse(savedData) || {};
  if (savedData) {
    Object.entries(savedData).forEach(([name, value]) => {
      dataset[name] = value;
      formEl[name].value = value;
    });
}
}

inputAfterReload();

formEl.addEventListener('submit', onFormSubmit);

formEl.addEventListener('input', throttle(onInputForm, 500));



  