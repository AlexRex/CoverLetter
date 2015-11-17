var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var open = require('open');

server.listen(2000);

open('http://localhost:2000');

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.get('/controller', function(req, res){
  res.sendfile(__dirname + '/controller.html');
});

io.on('connection', function (socket) {
  socket.on('accel', function (data) {
    //console.log(data);
    //console.log('emitting');
    socket.broadcast.emit('getAccel', {data: data.accel});
  });
});