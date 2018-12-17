// Interactive map
ymaps.ready(init);
function init(){
  var myMap = new ymaps.Map('map', {
    center: [59.93928755, 30.32950326],
    zoom: 16,
    controls: ['zoomControl', 'fullscreenControl']
  });
  myMap.behaviors.disable(['scrollZoom']);

  var myPlacemark = new ymaps.Placemark([59.93866336, 30.32307596], {}, {
    iconLayout: 'default#image',
    iconImageHref: 'img/pin.svg',
    iconImageSize: [80, 140],
    iconImageOffset: [-40, -140],
    iconShadow: true,
    iconShadowImageHref: 'img/pin-shadow.png',
    iconShadowImageSize: [182, 110],
    iconShadowImageOffset: [0, -110]
  });

  myMap.geoObjects.add(myPlacemark);
}

// Slider
var sliderToggles = document.querySelectorAll('.slider__toggle');
var slides = document.querySelectorAll('.slider__item');
var currentToggle = document.querySelector('.slider__toggle--current');
var currentSlide = document.querySelector('.slider__item--current');

var addToggledHandler = function(toggle, slide, index) {
  toggle.addEventListener('click', function() {
    if (!toggle.classList.contains('slider__toggle--current')) {
      currentToggle.classList.remove('slider__toggle--current');
      currentToggle.removeAttribute('aria-label');
      toggle.classList.add('slider__toggle--current');
      toggle.setAttribute('aria-label', 'Текущий слайд ' + (index+1));
    }
      currentToggle = toggle;
      currentSlide.classList.remove('slider__item--current');
      slide.classList.add('slider__item--current');
      currentSlide = slide;
  });
}

for (var i = 0; i < sliderToggles.length; i++) {
  addToggledHandler(sliderToggles[i], slides[i], i);
}

// Feedback pop-up
var modalOverlay = document.querySelector('.modal-overlay');
var modalPopup = modalOverlay.querySelector('.modal-feedback');
var modalForm = modalPopup.querySelector('.feedback-form');
var modalOpenBtn = document.querySelector('.contacts__button');
var modalCloseBtn = modalPopup.querySelector('.modal-feedback__close-button');
var modalInputName = modalForm.querySelector('input[type="text"]');
var modalInputEmail = modalForm.querySelector('input[type="email"]');
var modalInputMsg = modalForm.querySelector('textarea');
var fields = modalForm.querySelectorAll('.input');
var keys = {
  Tab: 9,
  Esc: 27
};

var isStorageSupport = true;
var storageName = "";
var storageEmail = "";

try {
  storageName = localStorage.getItem('name');
  storageEmail = localStorage.getItem('email');
}
catch (err) {
  isStorageSupport = false;
}

var clearStatus = function() {
  for (var i = 0; i < fields.length; i++) {
    if (fields[i].classList.contains('input--error')) {
      fields[i].classList.remove('input--error');
    }
    if (fields[i].hasAttribute('aria-invalid')) {
      fields[i].removeAttribute('aria-invalid');
    }
  }
}

modalOpenBtn.addEventListener('click', function(evt) {
  evt.preventDefault();
  clearStatus();
  modalOverlay.classList.add('modal-overlay--active');
  if (storageName && storageEmail) {
    modalInputName.value = storageName;
    modalInputEmail.value = storageEmail;
    modalInputMsg.focus();
  }
  else {
    modalInputName.focus();
  }
  window.addEventListener("keydown", function(evtEsc) {
    if (evtEsc.keyCode === keys.Esc) {
      evtEsc.preventDefault();
      modalOverlay.classList.remove('modal-overlay--active');
      modalOpenBtn.focus();
    }
  });
});

modalCloseBtn.addEventListener('click', function(evt) {
  evt.preventDefault();
  modalOverlay.classList.remove('modal-overlay--active');
  modalOpenBtn.focus();
});

modalCloseBtn.addEventListener('keydown', function(evt) {
  if (evt.keyCode === keys.Tab && !evt.shiftKey) {
    evt.preventDefault();
    modalInputName.focus();
  }
});

modalInputName.addEventListener('keydown', function(evt) {
  if (evt.keyCode === keys.Tab && evt.shiftKey) {
    evt.preventDefault();
    modalCloseBtn.focus();
  }
});

modalForm.addEventListener('submit', function(evt) {
  clearStatus();
  for (var i = 0; i < fields.length; i++) {
    if (!fields[i].value) {
      evt.preventDefault();
      fields[i].offsetWidth = fields[i].offsetWidth;
      fields[i].classList.add('input--error');
      fields[i].setAttribute('aria-invalid', 'true');
      fields[i].focus();
      return;
    }
  }
  if(isStorageSupport) {
    localStorage.setItem('name', modalInputName.value);
    localStorage.setItem('email', modalInputEmail.value);
  }
});
