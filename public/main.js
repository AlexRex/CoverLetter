	
  	var thisUrl = "http://192.168.1.145:2000/";

	//var socket = io.connect('https://protected-crag-6460.herokuapp.com/');
  	var socket = io.connect('http://192.168.1.145:2000');
  	
  	var thisId = ( Math.random() * 100 ) | 0;
  	socket.on('connect', function(){
  		console.log(thisId);
  		socket.emit('sendId', 15);
  		document.getElementById('qrCode').src = 'https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl='+thisUrl+'controller?id='+thisId;
  		document.getElementById('linkCode').innerHTML += 'Or go to the controller page with your mobile <strong style="font-size:22px;">'+thisUrl+'controller</strong> and use this id: <strong style="font-size:22px;">'+thisId+'</strong>';

  	});
  	
  	  socket.on('getAccel', function (data) {
  	  //console.log(data);
  	  if($('#qrModal').hasClass('in')){
 			$('#qrModal').modal('hide');
  	  }
  	  	var info = {
  	  		x: Math.round(data.alpha),
  	  		y: Math.round(data.beta),
  	  		z: Math.round(data.gamma)
  	  	};
  	  	console.log(info.y);

  	  	window.scrollBy(0,info.y/5);
  	  });



//https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=http://192.168.1.145:2000?id=

/* *************************************
 *            Bootstrap Style          *
 * *********************************** */

 //$('#qrModal').modal('show');


 /* *************************************
  *                Skrollr                 *
  * *********************************** */

var s = skrollr.init();

 /* *************************************
  *                Maps                 *
  * *********************************** */




function initMap() {
	var styles = [{"featureType":"landscape","stylers":[{"hue":"#FFBB00"},{"saturation":43.400000000000006},{"lightness":37.599999999999994},{"gamma":1}]},{"featureType":"road.highway","stylers":[{"hue":"#FFC200"},{"saturation":-61.8},{"lightness":45.599999999999994},{"gamma":1}]},{"featureType":"road.arterial","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":51.19999999999999},{"gamma":1}]},{"featureType":"road.local","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":52},{"gamma":1}]},{"featureType":"water","stylers":[{"hue":"#0078FF"},{"saturation":-13.200000000000003},{"lightness":2.4000000000000057},{"gamma":1}]},{"featureType":"poi","stylers":[{"hue":"#00FF6A"},{"saturation":-1.0989010989011234},{"lightness":11.200000000000017},{"gamma":1}]}];
	var map;
	var myLatlng = new google.maps.LatLng(38.382565, -0.513981);
	var myLatlngCenter = new google.maps.LatLng(45.382565, 5.513981);

	map = new google.maps.Map(document.getElementById('UAMap'), {
		center: myLatlngCenter,
		zoom: 4
	});

	map.setOptions({styles: styles});



	var marker = new google.maps.Marker({
	  position: myLatlng,
	  title:"University of Alicante, Spain."
	});

	// To add the marker to the map, call setMap();
	marker.setMap(map);
}

     

