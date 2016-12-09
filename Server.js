var http = require('http');



http.createServer(function (request, response) {

   // Send the HTTP header 

   // HTTP Status: 200 : OK

   // Content Type: text/plain

   response.writeHead(200, {'Content-Type': 'text/plain'});



    // Send the response body as "Hello Cloud"

    var processId = process.pid;

    response.end('process id: '+processId); 

   

}).listen(process.env.PORT);