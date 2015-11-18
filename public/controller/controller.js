//var socket = io.connect('https://protected-crag-6460.herokuapp.com');
var socket = io.connect('http://192.168.1.145:2000');
var connected = false;
var socketId = 0;
socket.on('connect', function(){
    connected = true;
    socketId = getURLParameter('id');
    socket.emit('get_connection', socketId, function(){
      document.getElementById('form').style.display = 'none';
      document.getElementById('instructions').style.display = 'block';
    });
});


if(window.DeviceOrientationEvent){
    window.addEventListener("deviceorientation", motion, false);
}else{
    console.log("DeviceOrientationEvent is not supported");
}

function motion(event){
    if(connected)
    socket.emit('accel', event);
}
function getURLParameter(name) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
}
function submittedForm(id){
    console.log(id);
}