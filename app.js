var express = require('express');
var app = express();
var path = require('path');

var server = require('http').Server(app);
var io = require('socket.io')(server);
var open = require('open');
server.listen(process.env.PORT || 4000, function() {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public'));


//open('http://localhost:2000');


app.get('/', function(req, res) {
    res.render('index', {company_name: ''});
});





app.get('/controller', function(req, res) {
    res.sendfile(__dirname + '/public/controller/controller.html');
});

app.use('/public', express.static(__dirname + '/public'));


io.on('connection', function(socket) {
    
	var sockId;

	// Browser
    socket.on('sendId', function(data){
    	console.log('sendId: '+data);
    	socket.join(data);
    	sockId = data;
    });


    //Mobile!
    socket.on('get_connection', function(data, fn){
    	console.log('getconn: '+data);
    	socket.join(data);
    	sockId = data;
    	if(data>-1)
    		fn();

    });


    //Pass the message from Mobile to Browser
    socket.on('accel', function(data) {
        //console.log(data);
        //console.log('emitting');
    	//console.log(data);
        
        io.to(sockId).emit('getAccel', data);
    });

    socket.on('shaked', function(data){
        io.to(sockId).emit('shaked');
    });
});