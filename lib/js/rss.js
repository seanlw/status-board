$(document).ready(function() {
	/* Set rss feed */
	var rssDivClone = $('#rss-init').clone();
	$(rssDivClone).attr('id', '');
	$('#rss-init').remove();

	var formatTime = function(timestamp) {
		var time = new Date(timestamp);

		var hours = time.getHours();
		var minutes = time.getMinutes();
		var ampm = hours >= 12 ? 'pm' : 'am';

		hours = hours % 12;
		hours = hours ? hours : 12;
		minutes = minutes < 10 ? '0' + minutes : minutes;

		return hours + ':' + minutes + ' ' + ampm;

	};

	setInterval(rss = function() {
		var items = [];
		var rsscounter = 0;

		var finishRSS = function() {
			items.sort(function(a, b) {
				return a.timestamp - b.timestamp;
			});
			
			$('#rss .rss-item').remove();
			for (var i = 0; i < items.length; i++) {
				var item = items[i];
				var newDivItem = $(rssDivClone).clone();
				
				$(newDivItem).find('.rss-item-meta h2').text(item.title);
				$(newDivItem).find('.rss-item-meta h3').text(item.feed_title + ' ' + formatTime(item.timestamp));
				$('#rss').prepend(newDivItem);
			}
		};


		var getRSS = function(url) {
			$.get(url, function(data) {
				rsscounter++;
				var title = $(data).find('channel > title').text();
				$(data).find('item').each(function(){
					var date = new Date($(this).find('pubDate').text());
					if ( isNaN(date.getTime()) ) {
						$(this).children().each(function(){
							if (this.nodeName === 'dc:date') {
								date = new Date($(this).text());
							}
						});						
					}
					items.push({ 'feed_title': title, 'timestamp': date.getTime(), 'title': $(this).find('title').text() });
				});
				if (rsscounter >= config.rss.feeds.length) {
					finishRSS();
				}
			});
		};

		for(var i = 0; i < config.rss.feeds.length; i++) {
			getRSS(config.rss.feeds[i]);
		}
	}, 630000);
	rss();
});