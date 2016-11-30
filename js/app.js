/* global angular */
angular.module('GardenApp', [])
.controller('gardenCtrl', [ '$scope', '$http', function ($scope, $http) {
  // TASKS:
  // get location
  // set location
  // get forecast
  // get reminder message
  // set water time
  // check if water time
  // launch reminder
  // if not DONE re launch reminder
  // display UI data

  var forecast
  var currentLocation = '-27.9218,-55.7542'

  var getForecast = function (location, callback) {
    $http.jsonp('https://api.darksky.net/forecast/4874c7d1304dee63c10ffb045c76da1b/' + location + '?&lang=es&units=si&callback=JSON_CALLBACK')
      .then(function (response) {
        forecast = response.data
        console.log('forecast', forecast)
        callback(forecast)
      }, function (response) {
        console.log('Algo salio mal. Status: ', response.status, 'statusText: ', response.statusText)
      })
  }

  var getReminderMessage = function (currentForecast) {
    if (currentForecast.currently.precipProbability === 0) {
      console.log('No te olvides de regar las plantas')
    } else {
      console.log('Hoy hay probabilidades de lluvia')
    }
  }
  getForecast(currentLocation, getReminderMessage)
}])
