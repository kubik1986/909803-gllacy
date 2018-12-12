// Функция ymaps.ready() будет вызвана, когда
// загрузятся все компоненты API, а также когда будет готово DOM-дерево.
ymaps.ready(init);
function init(){
  // Создание карты.
  var myMap = new ymaps.Map('map', {
    // Координаты центра карты.
    // Порядок по умолчанию: «широта, долгота».
    center: [59.93928755, 30.32950326],
    // Уровень масштабирования. Допустимые значения:
    // от 0 (весь мир) до 19.
    zoom: 16
  });
  myMap.behaviors.disable(['scrollZoom']);

  var myPlacemark = new ymaps.Placemark([59.93866336, 30.32307596], {}, {
    // Опции.
    // Необходимо указать данный тип макета.
    iconLayout: 'default#image',
    // Своё изображение иконки метки.
    iconImageHref: 'img/pin.svg',
    // Размеры метки.
    iconImageSize: [80, 140],
    // Смещение левого верхнего угла иконки относительно
    // её "ножки" (точки привязки).
    iconImageOffset: [-40, -140],
    // Флаг наличия тени у иконки.
    iconShadow: true,
    // Изображение тени иконки.
    iconShadowImageHref: 'img/pin-shadow.png',
    // Размер изображение тени.
    iconShadowImageSize: [182, 110],
    // Смещение левого верхнего угла изображения тени относительно
    // точки привязки иконки.
    iconShadowImageOffset: [0, -110]
  });

  myMap.geoObjects.add(myPlacemark);
}
