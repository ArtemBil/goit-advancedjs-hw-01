const localStorageKey = 'feedback-form-state';
const errorMessage = 'Fill please all fields';
const formElems = {
  feedbackFormElement: document.querySelector('.js-feedback-form'),
}
let formData = { email: '', message: '' };

const checkForLocalStorage = () => {
  try {
    const data = JSON.parse(localStorage.getItem(localStorageKey));

    if (!data) {
      return;
    }

    formData = data;

    Object.keys(data).forEach(key => {
      formElems.feedbackFormElement.elements[key].value = data[key];
    });
  } catch (error) {
    console.log(error);
  }
}

const onFieldChange = ({ target: { value, name } }) => {
  formData[name] = value.trim();

  localStorage.setItem(localStorageKey, JSON.stringify(formData));
}

const onFormSubmit = (event) => {
  event.preventDefault();
  const isFormFilledIn = Object.values(formData).every(value => value !== '' && value !== undefined);

  if (!isFormFilledIn) {
    return alert(errorMessage);
  }

  event.target.reset();
  localStorage.removeItem(localStorageKey);
  formData = { email: '', message: '' };
}

checkForLocalStorage();
formElems.feedbackFormElement.addEventListener('input', onFieldChange);
formElems.feedbackFormElement.addEventListener('submit', onFormSubmit);
