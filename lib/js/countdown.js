var cdtimer;
$(document).ready(function() {
	/* Countdown */
  setInterval(countdown = function() {
    $.ajax({
      url: config.countdown.file_url,
      dataType: 'json',
      success: function(data) {
        $('.panel-countdown-row').remove();
        for (var i = 0; i < data.length; i++) {
          var cd = data[i];

          date_parts = cd.date.split('/');
          var date = new Date(date_parts[2], date_parts[0] - 1, date_parts[1]);
          var days = Math.floor((date.getTime() - Date.now()) / (60 * 60 * 24 * 1000)) + 1;

          if (cd.countdown !== undefined && cd.countdown) {
            counterCountdown(cd);
          }
          else {
            $('.panel-countdown-multiple').append(
                '<div class="panel-countdown-row"> \
                    <div class="panel-countdown-days"> \
                        <h3 class="panel-countdown-day">' + days + '</h3> \
                        <span class="panel-countdown-label">day' + ((days != 1) ? 's' : '') + '</span> \
                    </div> \
                    <div class="panel-countdown-description">' + cd.desc + '</div> \
                </div>'
            );
          }
        }
      }
    });
	}, 3600000);
	countdown();
});

function counterCountdown(cd) {
  if ($('.panel-countdown-single').length > 0) {
    var date = new Date(cd.date + ' ' + cd.time);

    $('.panel-countdown-single').data('timestamp', date.getTime());
    $('.panel-countdown-single h2').text(cd.desc);
    
    this.timestamp = null;
    clearInterval(cdtimer);
    cdtimer = setInterval(countdowntimer = function() {
      if (!this.timestamp) {
          this.timestamp = $('.panel-countdown-single').data('timestamp');
      }

      var now = new Date();
      var target = new Date(this.timestamp);
      var diff = target - now;
      if (diff < 0) return;
              
      var _second = 1000;
      var _minute = 1000 * 60;
      var _hour = 1000 * 60 * 60;
      var _day = 1000 * 60 * 60 * 24;

      if (now.dst()) {
          diff -= _hour;
      }

      var days = Math.floor(diff / _day);
      var hours = Math.floor((diff % _day) / _hour);
      var minutes = Math.floor((diff % _hour) / _minute);
      var seconds = Math.floor((diff % _minute) / _second);

      $('.panel-countdown-container.day .panel-countdown-digit').text(days);
      $('.panel-countdown-container.hour .panel-countdown-digit').text(hours);
      $('.panel-countdown-container.minute .panel-countdown-digit').text(minutes);
      $('.panel-countdown-container.second .panel-countdown-digit').text(seconds);        
    }, 1000);
    countdowntimer();
  }
}

Date.prototype.stdTimezoneOffset = function() {
  var jan = new Date(this.getFullYear(), 0, 1);
  var jul = new Date(this.getFullYear(), 6, 1);
  return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
}

Date.prototype.dst = function() {
  return this.getTimezoneOffset() < this.stdTimezoneOffset();
}