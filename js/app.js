/* global angular */
angular.module('GardenApp', [])
.controller('gardenCtrl', [ '$scope', '$http', function ($scope, $http) {
    // set ubicacion
    // set horario de recordatorio
    // preguntar si en dia actual llueve
    // if false mostrar recordatorio para regar
    // if true mostrar probabilidades de precipitacion
  console.log('js cargado')

  var forecast

  $http.get('https://api.darksky.net/forecast/4874c7d1304dee63c10ffb045c76da1b/-27.9218,-55.7542?&lang=es&units=si')
    // for later testing ..
    // .then(function (response) {
    //   console.log(response.data)
    // }, function (response) {
    //   console.log('status: ', response.status, 'statusText: ', response.statusText)
    // })
    .then(function (response) {
      forecast = response.data
      console.log('forecast', forecast)
      if (forecast.currently.precipProbability === 0) {
        console.log('No te olvides de regar las plantas')
      } else {
        console.log('Hoy hay probabilidades de lluvia')
      }
    }, function (response) {
      console.log('Algo salio mal. Status: ', response.status, 'statusText: ', response.statusText)
    })
}])
