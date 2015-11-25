//var thisUrl = 'https://protected-crag-6460.herokuapp.com/';
var thisUrl = "http://192.168.1.145:4000/";
//var thisUrl = "http://172.16.80.185:4000/";


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

    var data = {
        alpha: event.alpha,
        beta: event.beta,
        gamma: event.gamma
    };

    //console.log(data);
    if(connected){
        socket.emit('accel', data);
    }
}

var shakeEvent = new Shake({threshold: 7});

shakeEvent.start();

window.addEventListener('shake', function(){
        if(connected)
            socket.emit('shaked');
}, false);

//stop listening
function stopShake(){
    shakeEvent.stop();
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