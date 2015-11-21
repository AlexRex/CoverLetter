var thisUrl = 'https://protected-crag-6460.herokuapp.com/';
//var thisUrl = "http://192.168.1.145:2000/";

var socket = io.connect(thisUrl);

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

function motion(event){
    document.getElementById('instructions').innerHTML = event.alpha;
    console.log(event);
    if(connected){
        socket.emit('accel', event);
    }
}


if(window.DeviceOrientationEvent){
    window.addEventListener("deviceorientation", motion, false);

}else{
    document.getElementById('instructions').innerHTML = 'This app is not supported in this device.';

    console.log("DeviceOrientationEvent is not supported");
}


function getURLParameter(name) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
}
function submittedForm(id){
    console.log(id);
}