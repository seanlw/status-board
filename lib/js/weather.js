$(document).ready(function(){
  /* Set Weather every so often */
  setInterval(weather = function() {
    $.get('http://api.wunderground.com/api/' + config.weather.api_key + '/conditions/q/' + config.weather.zip + '.json', function(data) {
      $('#panel-weather-city').text(data.current_observation.display_location.city + ', ' + data.current_observation.display_location.state);
      $('#panel-weather-temp').text(Math.round(data.current_observation.temp_f));
    });

    $.get('http://api.wunderground.com/api/' + config.weather.api_key + '/forecast10day/q/' + config.weather.state + '/' + config.weather.city + '.json', function(data) {
      for (var i = 1; i <= 5; i++ ) {
        var fc = data.forecast.simpleforecast.forecastday[i];
        var class_code = '';

        switch(fc.icon) {
          case 'chancerain':
          case 'chancetstorms':
          case 'rain':
          case 'tstorms':
          case 'unknown':
            class_code = 'weather-rain';
            break;
          case 'chanceflurries':
          case 'chancesleet':
          case 'chancesnow':
          case 'flurries':
          case 'sleet':
          case 'snow':
            class_code = 'weather-snow';
            break;
          case 'cloudy':
          case 'fog':
          case 'hazy':
            class_code = 'weather-cloud';
            break;
          case 'mostlycloudy':
          case 'mostlysunny':
          case 'partlysunny':
          case 'partlycloudy':
            class_code = 'weather-cloud-sun';
            break;
          default:
            class_code = 'weather-sun';
        }

        $('#panel-weather-day-' + i).removeClass('weather-sun weather-cloud weather-cloud-sun weather-snow weather-rain').addClass(class_code);
        $('#panel-weather-weekday-' + i).text(fc.date.weekday_short);
        $('#panel-weather-high-' + i).text(fc.high.fahrenheit);
        $('#panel-weather-low-' + i).text(fc.low.fahrenheit);
      }
    });
  }, 630000);
  weather();
});