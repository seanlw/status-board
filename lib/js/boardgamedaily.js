var bgg_plays = '';
function getPlays(page) {
  if ( page === undefined) { page = 1; bgg_plays = ''; }
  
  var url = "https://www.boardgamegeek.com/xmlapi2/plays?username=" + config.bgg.username + "&type=thing&subtype=boardgame&page=" + page;
  $.ajax({
    url: url,
    type: 'GET'
  })
  .done(function(data){
    bgg_plays += $(data).find("plays").html();
    if ($(data).find('play').length === 100) {
      getPlays(page+1);
    }
    else {
      bgg_plays = '<plays>' + bgg_plays + '</plays>';
      showBarGraph(bgg_plays);
      showBubbleGraph(bgg_plays);
    }
  });
}

function showBubbleGraph(root) {
  var diameter = 200,
      format = d3.format(",d"),
      color = d3.scale.category20c();

  var bubble = d3.layout.pack()
      .sort(null)
      .size([diameter, diameter])
      .padding(1.5);

  var svg = d3.select(".panel-boardgame-plays").append("svg")
      .attr("width", diameter)
      .attr("height", diameter)
      .attr("class", "bubble");

  var node = svg.selectAll(".node")
      .data(bubble.nodes(cleanup(root)).filter(function(d) { return !d.children; }))
      .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

  node.append("title")
      .text(function(d) { return d.title + ": " + format(d.value); });

  node.append("circle")
      .attr("r", function(d) { return d.r; })
      .style("fill", function(d) { return color(d.value); });

  node.append("text")
      .attr("dy", ".3em")
      .style("text-anchor", "middle")
      .text(function(d) { return d.title.substring(0, d.r / 5); });

  d3.select(self.frameElement).style("height", diameter + "px");
  
  function cleanup(root) {
    root = $.parseXML(root);
    var items = {};
    var r = [];

    $(root).find('play').each(function(){
      var objectid = $(this).find("item").attr("objectid");
      if (objectid in items) {
        items[objectid]['value'] += 1;
      }
      else {
        items[objectid] = { "title": $(this).find("item").attr("name"), "value": 1 }
      }
      
    });
    
    for (var key in items) {
      var item = items[key];
      if (item.value >= 3) {
        r.push(item);
      }
    }

    return { children: r }
  }
};

function showBarGraph(root) {
  var margin = {top: 20, right: 6, bottom: 6, left: 6},
  width = 755 - margin.left - margin.right,
  height = 204 - margin.top - margin.bottom;

  var parseDate = d3.time.format("%Y-%m-%d").parse;
  var formatDate = d3.time.format('%Y-%m-%d');

  var x = d3.scale.ordinal()
      .rangeRoundBands([0, width], .1);

  var y = d3.scale.linear()
      .range([height, 0]);


  var svg = d3.select(".boardgame-yearly").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var data = parseData(root);
  data.forEach(function(d) {
    d.plays = +d.plays;
  });

  x.domain(data.map(function(d) { return d.date; }));
  y.domain([0, d3.max(data, function(d) { return d.plays; })]);

  svg.selectAll(".bar")
  .data(data)
  .enter().append("rect")
  .attr("class", "bar")
  .attr("x", function(d) { return x(d.date); })
  .attr("width", x.rangeBand())
  .attr("y", function(d) { return y(d.plays); })
  .attr("height", function(d) { return height - y(d.plays); })
  .append("title").text(function(d) { return formatDate(d.date) + ': ' + d.plays + ' play' + ((d.plays == 1) ? '' : 's') });

  function parseData(root){
    root = $.parseXML(root);

    var items = {};
    var r = [];
    $(root).find('play').each(function(){
      var date = $(this).attr('date');
      if (date in items ) {
        items[date]['plays'] += 1;
      }
      else {
        items[date] = { "date": parseDate(date), "plays": 1 };
      }
     });

    var today = new Date();
    var lookupdate = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
    var daydiff = Math.round((today.getTime() - lookupdate.getTime()) / (24 * 60 * 60 * 1000));

    $('.header-days').text(daydiff);
    for ( var i = 0; i < daydiff; i++ ){
      date = formatDate(lookupdate);
      if ( date in items) {
        r.push(items[date]);
      }
      else {
        r.push({ "date": parseDate(date), "plays": 0 });
      }
      lookupdate.setDate(lookupdate.getDate() + 1);
    }

    return r;
  };    
};

getPlays();