const form = document.querySelector('form');
const eField = form.querySelector('.email');
const eInput = eField.querySelector('input');
const pField = form.querySelector('.password');
const pInput = pField.querySelector('input');

form.onsubmit = (e) => {
  e.preventDefault(); //preventing form from submitting

  if (eInput.value == '') {
    //if email is empty
    eField.classList.add('shake', 'error');
  } else {
    checkEmail();
  }
  if (pInput.value == '') {
    //if password is empty
    pField.classList.add('shake', 'error');
  }

  setTimeout(() => {
    eField.classList.remove('shake');
    pField.classList.remove('shake');
  }, 500);

  //let's work on input keyup

  eInput.onkeyup = () => {
    checkEmail();
  };

  function checkEmail() {
    let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/; //pattern to valid email
    if (!eInput.value.match(pattern)) {
      //if pattern not matched with user entered value
      eField.classList.add('error');
      let errorText = eField.querySelector('.error-txt');
      eInput.value != ''
        ? (errorText.innerText = 'Enter a valid email address')
        : (errorText.innerText = "Email can't be blank");
    } else {
      eField.classList.remove('error');
    }
  }

  pInput.onkeyup = () => {
    if (pInput.value == '') {
      //if password is empty
      pField.classList.add('error');
    } else {
      pField.classList.remove('error');
    }
  };

  //let work on waht to do after user filled up proper details
  //if error class not contains in eField and pField then user has enterd proper details
  if (
    !eField.classList.contains('error') &&
    !pField.classList.contains('error')
  ) {
    window.location.href = '#'; //remove that # and put that url where you wnat to submit the form data
    //window.location.href = form.getAttribute('action');
  }
};
