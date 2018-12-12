// Resizing and validation of filter's price fields.
var priceInputs = document.querySelectorAll('.filters-form__price');
var minPriceField = document.querySelector('#min-price-field');
var maxPriceField = document.querySelector('#max-price-field');
var minPrice = parseInt(minPriceField.getAttribute('min'));
var maxPrice = parseInt(minPriceField.getAttribute('max'));

var resize = function(input) {
  input.style.width = ((input.value.length) * 8) + 'px';
};

var addPriceFieldHandler = function(priceInput) {
  priceInput.addEventListener('input', function() {
    resize(this);
  });
  priceInput.addEventListener('change', function() {
    resize(this);
    if (parseInt(priceInput.value) < minPrice || priceInput.value == '') {
      priceInput.value = minPrice;
      resize(this);
    }
    if (parseInt(priceInput.value) > maxPrice) {
      priceInput.value = maxPrice;
      resize(this);
    }
    if (parseInt(maxPriceField.value) < parseInt(minPriceField.value)) {
      maxPriceField.value = minPriceField.value;
      resize(maxPriceField);
    }
  });
};

for (var i = 0; i < priceInputs.length; i++) {
  addPriceFieldHandler(priceInputs[i]);
};
