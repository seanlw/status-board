$(document).ready(function(){
	setInterval(calendar = function() {
		var date = new Date();
		var day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		
		$('#panel-calendar-day').text(day[date.getDay()]);
		$('#panel-calendar-date').text(date.getDate());
	}, 60000);
	calendar();
});
