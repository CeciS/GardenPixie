/* global angular, alert */
angular.module('GardenApp', [])
.controller('gardenCtrl', [ '$scope', '$http', '$filter', function ($scope, $http, $filter) {
  var $ctrl = this
  var forecast = ''
  var apiKey = '4874c7d1304dee63c10ffb045c76da1b'

  $ctrl.today = {
    summary: '',
    precipProbability: '',
    reminderMsg: ''
  }
  $ctrl.setted = {
    cityName: '',
    currentLocation: '',
    waterHourString: '',
    waterHour: ''
  }

  // gets weather data and saves current day summary and precipitation Probability
  var getForecast = function (key, location, callback) {
    $http.jsonp('https://api.darksky.net/forecast/' + key + '/' + location + '?&lang=es&units=si&callback=JSON_CALLBACK')
      .then(function (response) {
        forecast = response.data

        $ctrl.today.summary = forecast.daily.data[0].summary
        $ctrl.today.precipProbability = forecast.daily.data[0].precipProbability

        console.log('forecast', forecast)
        getReminderMessage()
        typeof callback === 'function' && callback(forecast)
      }, function (response) {
        console.log('Algo salio mal. Status: ', response.status, 'statusText: ', response.statusText)
      })
  }

  var setWaterHourOnSunset = function (currentForecast) {
    $ctrl.setted.waterHour = new Date(currentForecast.daily.data[0].sunsetTime * 1000)
    $ctrl.setted.waterHourString = $filter('date')($ctrl.setted.waterHour, 'HH:mm')
    timeUntilHour($ctrl.setted.waterHour)
  }

  var getCurrentLocation = function (callback) {
    // TODO detectar localizacion
    $ctrl.setted.cityName = 'Apóstoles, Misiones'
    $ctrl.setted.currentLocation = '-27.9218,-55.7542'

    callback(apiKey, $ctrl.setted.currentLocation, setWaterHourOnSunset)
  }

  // funciones de recordatorio
  var getReminderMessage = function () {
    if ($ctrl.today.precipProbability === 0) {
      $ctrl.today.reminderMsg = 'No te olvides de regar las plantas'
    } else {
      $ctrl.today.reminderMsg = 'Hoy hay probabilidades de lluvia'
    }
  }

  var setReminderTimer = function (millisecondsUntilHour) {
    setTimeout(function () {
      alert($ctrl.today.reminderMsg)
    }, millisecondsUntilHour)
  }

  var timeUntilHour = function (hour) {
    var currentTime = new Date()
    var millisecondsUntilHour = hour - currentTime
    console.log('millisecondsUntilHour', millisecondsUntilHour)
    setReminderTimer(millisecondsUntilHour)
  }

  // first init

  // get location
  // set coordinates
  // call get forecast
  // setWaterHourOnSunset

  getCurrentLocation(getForecast)
}])
