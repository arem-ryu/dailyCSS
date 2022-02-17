// weather API (JOIN for api key)
// https://openweathermap.org/

const apiKey = '-';

const wrapper = document.querySelector('.wrapper');
const inputPart = wrapper.querySelector('.input-part');
const infoTxt = inputPart.querySelector('.info-txt');
const inputField = inputPart.querySelector('input');
const wIcon = document.querySelector('.weather-part img');
const arrowBack = wrapper.querySelector('header i');

const locationBtn = inputPart.querySelector('button');

inputField.addEventListener('keyup', (e) => {
  if (e.key == 'Enter' && inputField.value != '') {
    requestApi(inputField.value);
  }
});

locationBtn.addEventListener('click', () => {
  if (navigator.geolocation) {
    //if browser support geolocation api
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    alert('Your browser not support geolocation api');
  }
});

function onSuccess(position) {
  const { latitude, longitude } = position.coords;
  let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  fetchData(api);
}

function onError(error) {
  infoTxt.innerText = error.message;
  infoTxt.classList.add('error');
}

function requestApi(city) {
  let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  fetchData(api);
}

function fetchData(api) {
  infoTxt.innerText = 'Getting weather details..';
  infoTxt.classList.add('pending');

  //getting api response and returning it with parsing into js obj and in aother
  //then function calling weatherDetails function with pass api result as an argument
  fetch(api)
    .then((response) => response.json())
    .then((result) => weatherDetails(result));
}

function weatherDetails(info) {
  if (info.cod == '404') {
    infoTxt.innerText = `${inputField.value} isn't valid city name`;
    infoTxt.classList.replace('pending', 'error');
  } else {
    //get required properties value from the info object
    const city = info.name;
    const country = info.sys.country;
    const { description, id } = info.weather[0];
    const { feels_like, humidity, temp } = info.main;

    //pass value these values to a particualr html element
    wrapper.querySelector('.temp .numb').innerText = Math.floor(temp); // 반올림하여 정수로 바꿈
    wrapper.querySelector('.weather').innerText = description;
    wrapper.querySelector('.location span').innerText = `${city}, ${country}`;
    wrapper.querySelector('.temp .numb-2').innerText = feels_like;
    wrapper.querySelector('.humidity span').innerText = `${humidity}%`;
    //using custom icon according to the id which api return us
    if (id == 800) {
      wIcon.src = 'icon/clear.svg';
    } else if (id >= 200 && id <= 232) {
      wIcon.src = 'icon/storm.svg';
    } else if ((id >= 300 && id <= 321) || (id >= 500 && id <= 531)) {
      wIcon.src = 'icon/rain.svg';
    } else if (id >= 600 && id <= 622) {
      wIcon.src = 'icon/snow.svg';
    } else if (id >= 700 && id <= 781) {
      wIcon.src = 'icon/haze.svg';
    } else if (id >= 801 && id <= 804) {
      wIcon.src = 'icon/cloud.svg';
    }

    infoTxt.classList.remove('pending', 'error');
    wrapper.classList.add('active');
  }
  console.log(info);
}

arrowBack.addEventListener('click', () => {
  wrapper.classList.remove('active');
});
