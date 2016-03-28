$(document).ready(function(){
  /* Update the clock hands */
  setInterval(clock = function() {
    var time = new Date();
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();
    
    hours += (minutes / 60);
    minutes += (seconds / 60);
    
    /* Hours */
    $('#panel-clock-hand-hours').css({ WebkitTransform: 'rotate(' + (hours * 30) + 'deg)' });
    $('#panel-clock-hand-hours').css({ '-moz-transform': 'rotate(' + (hours * 30) + 'deg)' });
    $('#panel-clock-hand-hours').css({ transform: 'rotate(' + (hours * 30) + 'deg)' });
    
    /* Minutes */
    $('#panel-clock-hand-minutes').css({ WebkitTransform: 'rotate(' + (minutes * 6) + 'deg)' });
    $('#panel-clock-hand-minutes').css({ '-moz-transform': 'rotate(' + (minutes * 6) + 'deg)' });
    $('#panel-clock-hand-minutes').css({ transform: 'rotate(' + (minutes * 6) + 'deg)' });
    
    /* Seconds */
    $('#panel-clock-hand-seconds').css({ WebkitTransform: 'rotate(' + (seconds * 6) + 'deg)' });
    $('#panel-clock-hand-seconds').css({ '-moz-transform': 'rotate(' + (seconds * 6) + 'deg)' });
    $('#panel-clock-hand-seconds').css({ transform: 'rotate(' + (seconds * 6) + 'deg)' });
  }, 1000);
  clock();
});