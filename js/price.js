// Resizing and validation of filter's price fields.
var priceInputs = document.querySelectorAll('.filters-form__price');
var minPriceField = document.querySelector('#min-price-field');
var maxPriceField = document.querySelector('#max-price-field');
var minPrice = parseInt(minPriceField.getAttribute('min'));
var maxPrice = parseInt(maxPriceField.getAttribute('max'));
var averageCharWidth = 8;
var pixelCorrection = 2;

var resize = function(input) {
  input.style.width = (input.value.length * averageCharWidth + pixelCorrection) + 'px';
};

var addPriceFieldHandler = function(priceInput) {
  priceInput.addEventListener('input', function(evt) {
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
    if (parseInt(maxPriceField.value) < parseInt(minPriceField.value)) {
      if (evt.target === minPriceField) {
        maxPriceField.value = minPriceField.value;
        resize(maxPriceField);
      }
      if (evt.target === maxPriceField) {
        minPriceField.value = maxPriceField.value;
        resize(minPriceField);
      }
    }
  });
};

for (var i = 0; i < priceInputs.length; i++) {
  addPriceFieldHandler(priceInputs[i]);
}
