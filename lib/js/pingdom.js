$(document).ready(function() {
  /* Get Pingdom status */
  var pingdomDivClone = $('#pingdom-init').clone();
  $(pingdomDivClone).attr('id', '');
  $('#pingdom-init').remove();
  
  setInterval(pingdom = function() {
    $.ajax({
      url: 'https://api.pingdom.com/api/2.0/checks',
      headers: {
        'App-Key': config.pingdom.api_key
      },
      username: config.pingdom.username,
      password: config.pingdom.password
    })
    .done(function(data) {
      $('.pingdom-server').remove();
      
      for (var i = 0; i < data.checks.length; i++) {
        var server = data.checks[i];

        if (config.pingdom.servers.indexOf(server.hostname) > -1) {
          var newDivItem = $(pingdomDivClone).clone();
          $(newDivItem).find('img').attr('src', 'lib/img/server-' + server.status + '.png');
          $(newDivItem).find('.pingdom-server-name h2').text(server.name);
          
          var text = '';
          if (server.status == 'up') {
            text = 'Response Time: ' + server.lastresponsetime + ' ms'
          }
          else if (server.status == 'down') {
            text = 'DOWN RIGHT NOW';
          }
          else {
            text = 'Unknown';
          }
          $(newDivItem).find('.pingdom-server-name h3').text(server.hostname + ' / ' + text);
          
          $('#pingdom').append(newDivItem);
        }
      }
    });
  }, 630000);
  pingdom();
});