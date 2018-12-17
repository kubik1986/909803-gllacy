// Price filter (fields + slider).
var priceInputs = document.querySelectorAll('.filters-form__price');
var minPriceField = document.querySelector('#min-price-field');
var maxPriceField = document.querySelector('#max-price-field');
var minPrice = +minPriceField.getAttribute('min');
var maxPrice = +maxPriceField.getAttribute('max');
var averageCharWidth = 8; //px
var pixelCorrection = 2; //px

var grips = document.querySelectorAll('.slider-contoller__grip');
var gripMin = document.querySelector('.slider-contoller__grip--min');
var gripMax = document.querySelector('.slider-contoller__grip--max');
var gripWidth = gripMin.offsetWidth;
var gripGrowingDelta = 1; // +1px at both sides of grip when it picked-up
var gripMinPosition = 0;
var gripMaxPosition = 0;
var sliderController = document.querySelector('.slider-contoller');
var sliderControllerWidth = sliderController.offsetWidth - gripWidth; //working range for grips
var costPerPixel = (maxPrice - minPrice) / sliderControllerWidth;
var sliderBar = document.querySelector('.slider-contoller__current-range');
var sliderBarMin = 0;
var sliderBarMax = 0;

var resizeInputs = function() { //changes inputs width
  for (var i=0; i < priceInputs.length; i++) {
    priceInputs[i].style.width = (priceInputs[i].value.length * averageCharWidth + pixelCorrection) + 'px';
  }
};

var updateFields = function () { //updates inputs value while grip's moving
  minPriceField.value = Math.round(minPrice + gripMinPosition * costPerPixel);
  maxPriceField.value = Math.round(minPrice + gripMaxPosition * costPerPixel);
  resizeInputs();
};

var checkGripPosition = function(grip) { //check grip's position and change it when grip is outside it's position range
  if (grip === gripMin) {
    if (gripMinPosition < 0) {
      gripMinPosition = 0;
    }
    if (gripMinPosition > sliderControllerWidth - gripWidth) {
      gripMinPosition = sliderControllerWidth - gripWidth;
    }
  }
  if (grip === gripMax) {
    if (gripMaxPosition > sliderControllerWidth) {
      gripMaxPosition = sliderControllerWidth;
    }
    if (gripMaxPosition < gripWidth) {
      gripMaxPosition = gripWidth;
    }
  }
}

var updateGrips = function(targetField) { //updates grips positions after fields changing and while mouse moving
  gripMinPosition = (+minPriceField.value - minPrice) / costPerPixel;
  checkGripPosition(gripMin);
  gripMaxPosition = (+maxPriceField.value - minPrice) / costPerPixel;
  checkGripPosition(gripMax);
  var delta = gripWidth - (gripMaxPosition - gripMinPosition);
  if (delta > 0) {
    if (targetField === minPriceField) {
      gripMaxPosition = gripMaxPosition + delta;
    }
    if (targetField === maxPriceField) {
      gripMinPosition = gripMinPosition - delta;
    }
  }
  sliderBarMin = gripMinPosition;
  sliderBarMax = gripMaxPosition;
  gripMin.style.left = gripMinPosition + 'px';
  gripMax.style.left = gripMaxPosition + 'px';
  sliderBar.style.marginLeft = sliderBarMin + 'px';
  sliderBar.style.marginRight = (sliderControllerWidth - sliderBarMax) + 'px';
};

var addPriceFieldHandler = function(priceInput) {
  priceInput.addEventListener('input', function(evt) {
    resizeInputs();
    updateGrips(evt.target);
  });
  priceInput.addEventListener('change', function(evt) {
    if (+priceInput.value < minPrice || priceInput.value == '') {
      priceInput.value = minPrice;
    }
    if (+priceInput.value > maxPrice) {
      priceInput.value = maxPrice;
    }
    if (+maxPriceField.value < +minPriceField.value) {
      if (evt.target === minPriceField) {
        maxPriceField.value = minPriceField.value;
      }
      if (evt.target === maxPriceField) {
        minPriceField.value = maxPriceField.value;
      }
    }
    priceInput.value = +priceInput.value; // removes leading zeros (00125 ->  125)
    resizeInputs();
  });
};

var addGripHandler = function(grip) {
  grip.onmousedown = function (evt) {
    evt.preventDefault();
    var gripLeftCoord = grip.getBoundingClientRect().left + window.pageXOffset;
    var shiftX = evt.pageX - gripLeftCoord - gripGrowingDelta;
    var sliderLeftCoord = sliderController.getBoundingClientRect().left + window.pageXOffset;

    function moveAt(evtMove) {
      var field = minPriceField;
      gripPosition = evtMove.pageX - sliderLeftCoord - shiftX;
      if (evt.target === gripMin) {
        gripMinPosition = gripPosition;
        checkGripPosition(gripMin);
      }
      if (evt.target === gripMax) {
        gripMaxPosition = gripPosition;
        checkGripPosition(gripMax);
        field = maxPriceField;
      }
      updateFields();
      updateGrips(field);
    };

    document.onmousemove = function(evtMove) {
      moveAt(evtMove);
    };

    document.onmouseup = function() {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  };
};

updateGrips(minPriceField); //initialization
resizeInputs();
for (var i = 0; i < priceInputs.length; i++) {
  addPriceFieldHandler(priceInputs[i]);
}
for (var i=0; i < grips.length; i++) {
  addGripHandler(grips[i]);
}
