var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(3000, '192.168.240.127');
console.log('Server running at http://192.168.240.127:3000/');