var express = require('express')
var bodyParser = require('body-parser')

var app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
var net = require('net');



// POST method route
app.post('/', function (req, res) {
    var post_data = req.body;
    console.log(post_data);
    var client = new net.Socket();
    client.connect(80, 'revich.lib.ru', function() {
        console.log('Connected');
        client.write("GET /index.html HTTP/1.1\r\nHost: revich.lib.ru\r\n\r\n");
        //client.write("Host: google.ru");
        
    });

    client.on('data', function(data) {
        console.log('Received: ' + data);
        client.destroy(); // kill client after server's response
        res.send('POST request to the homepage');
    });

    client.on('close', function() {
        console.log('Connection closed');
    });

    
  });

  var port = 8081;
app.set('port', port)
  /**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
    console.log('%s App is running at http://localhost:%d in %s mode');
    console.log('  Press CTRL-C to stop\n');
  });
  
  module.exports = app;