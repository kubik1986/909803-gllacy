// Resizing and validation of filter's price fields.
var priceInputs = document.querySelectorAll('.filters-form__price');
var minPriceField = document.querySelector('#min-price-field');
var maxPriceField = document.querySelector('#max-price-field');
var minPrice = parseInt(minPriceField.getAttribute('min'));
var maxPrice = parseInt(minPriceField.getAttribute('max'));
var averageCharWidth = 8;

var resize = function(input) {
  input.style.width = ((input.value.length) * averageCharWidth) + 'px';
};

var addPriceFieldHandler = function(priceInput) {
  priceInput.addEventListener('input', function(evt) {
    if (priceInput.value) {
      priceInput.value = parseInt(priceInput.value);
    }
    resize(this);
  });
  priceInput.addEventListener('change', function(evt) {
    if (parseInt(priceInput.value) < minPrice || priceInput.value == '') {
      priceInput.value = minPrice;
      resize(this);
    }
    if (parseInt(priceInput.value) > maxPrice) {
      priceInput.value = maxPrice;
      resize(this);
    }
    if (evt.target === minPriceField && parseInt(maxPriceField.value) < parseInt(minPriceField.value)) {
      maxPriceField.value = minPriceField.value;
      resize(maxPriceField);
    }
    if (evt.target === maxPriceField && parseInt(maxPriceField.value) < parseInt(minPriceField.value)) {
      minPriceField.value = maxPriceField.value;
      resize(minPriceField);
    }
  });
};

for (var i = 0; i < priceInputs.length; i++) {
  addPriceFieldHandler(priceInputs[i]);
}
