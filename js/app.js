/* global angular */
angular.module('GardenApp', [])
.controller('gardenCtrl', [ '$scope', '$http', function ($scope, $http) {
  // TASKS:
  // get location
  // set location
  // check if water time
  // launch reminder
  // if not DONE re launch reminder
  // display UI data
  // set water time

  // DONE
  // get forecast
  // get reminder message

  var $ctrl = this
  var forecast = ''
  // var currentTime = new Date()

  $ctrl.today = {
    summary: '',
    precipProbability: '',
    reminderMsg: ''
  }
  $ctrl.setted = {
    cityName: 'Apóstoles, Misiones',
    currentLocation: '-27.9218,-55.7542',
    waterHourString: '',
    waterHour: ''
  }

  // gets weather data and saves current day summary and precipitation Probability
  var getForecast = function (location, callback) {
    $http.jsonp('https://api.darksky.net/forecast/4874c7d1304dee63c10ffb045c76da1b/' + location + '?&lang=es&units=si&callback=JSON_CALLBACK')
      .then(function (response) {
        forecast = response.data

        $ctrl.today.summary = forecast.daily.data[0].summary
        $ctrl.today.precipProbability = forecast.daily.data[0].precipProbability

        console.log('forecast', forecast)

        callback()
      }, function (response) {
        console.log('Algo salio mal. Status: ', response.status, 'statusText: ', response.statusText)
      })
  }

  var getReminderMessage = function () {
    if ($ctrl.today.precipProbability === 0) {
      $ctrl.today.reminderMsg = 'No te olvides de regar las plantas'
    } else {
      $ctrl.today.reminderMsg = 'Hoy hay probabilidades de lluvia'
    }
  }

  var setWaterHourOnSunset = function (currentForecast) {
    $ctrl.setted.waterHour = new Date(currentForecast.daily.data[0].sunsetTime * 1000)
    $ctrl.setted.waterHourString = $ctrl.setted.waterHour.getHours() + ':' + $ctrl.setted.waterHour.getMinutes()
  }

  // init
  getForecast($ctrl.setted.currentLocation, getReminderMessage)
}])
