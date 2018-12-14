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
};
